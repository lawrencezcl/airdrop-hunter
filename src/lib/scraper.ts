import axios from 'axios';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface AirdropSource {
  id: string;
  name: string;
  url: string;
  type: 'twitter' | 'website' | 'github' | 'forum' | 'rss';
  language: 'english' | 'chinese';
}

interface ScrapedAirdrop {
  name: string;
  description?: string;
  category: string;
  blockchain: string;
  official_website?: string;
  twitter_handle?: string;
  requirements?: string[];
  eligibility_criteria?: string[];
}

class AirdropScraper {
  private sources: AirdropSource[] = [
    {
      id: 'airdropsio',
      name: 'Airdrops.io',
      url: 'https://airdrops.io/active/',
      type: 'website',
      language: 'english'
    },
    {
      id: 'defillama',
      name: 'DeFi Llama Airdrops',
      url: 'https://defillama.com/airdrops',
      type: 'website',
      language: 'english'
    },
    {
      id: 'dappradar',
      name: 'DappRadar Airdrops',
      url: 'https://dappradar.com/airdrops',
      type: 'website',
      language: 'english'
    },
    {
      id: 'coinmarketcap',
      name: 'CoinMarketCap Airdrops',
      url: 'https://coinmarketcap.com/airdrop/',
      type: 'website',
      language: 'english'
    }
  ];

  async scrapeAllSources(): Promise<void> {
    console.log('Starting to scrape all sources...');

    for (const source of this.sources) {
      try {
        await this.scrapeSource(source);
      } catch (error) {
        console.error(`Failed to scrape ${source.name}:`, error);
        await this.logScrapingResult(source.id, 'failed', 0, error instanceof Error ? error.message : 'Unknown error');
      }
    }
  }

  private async scrapeSource(source: AirdropSource): Promise<void> {
    console.log(`Scraping ${source.name}...`);

    try {
      const response = await axios.get(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const airdrops: ScrapedAirdrop[] = [];

      // Extract airdrops based on source type
      switch (source.type) {
        case 'website':
          await this.extractFromWebsite($, airdrops, source);
          break;
        default:
          console.log(`Scraper for ${source.type} not implemented yet`);
      }

      // Save to database
      if (airdrops.length > 0) {
        await this.saveAirdrops(airdrops, source.language);
        await this.logScrapingResult(source.id, 'success', airdrops.length);
      } else {
        await this.logScrapingResult(source.id, 'partial', 0, 'No airdrops found');
      }

    } catch (error) {
      throw error;
    }
  }

  private async extractFromWebsite($: cheerio.CheerioAPI, airdrops: ScrapedAirdrop[], source: AirdropSource): Promise<void> {
    // Generic website scraping logic - adapt based on actual website structure
    const selectors = {
      airdropsio: {
        container: '.airdrop-row',
        name: '.airdrop-name',
        description: '.airdrop-description',
        category: '.airdrop-category',
        blockchain: '.airdrop-blockchain'
      },
      defillama: {
        container: '[data-testid="airdrop-card"]',
        name: 'h3',
        description: 'p',
        category: '.tag',
        blockchain: '.chain'
      }
    };

    const selector = selectors[source.id as keyof typeof selectors] || selectors.airdropsio;

    $(selector.container).each((index, element) => {
      const $element = $(element);

      const name = $element.find(selector.name).text().trim();
      const description = $element.find(selector.description).text().trim();
      const category = $element.find(selector.category).text().trim();
      const blockchain = $element.find(selector.blockchain).text().trim();

      if (name && category) {
        airdrops.push({
          name,
          description: description || undefined,
          category: this.normalizeCategory(category),
          blockchain: this.normalizeBlockchain(blockchain),
          requirements: [],
          eligibility_criteria: []
        });
      }
    });
  }

  private normalizeCategory(category: string): string {
    const normalized = category.toLowerCase();
    if (normalized.includes('layer') || normalized.includes('l2')) return 'Layer 2';
    if (normalized.includes('defi')) return 'DeFi';
    if (normalized.includes('game')) return 'Gaming';
    if (normalized.includes('social')) return 'Social';
    if (normalized.includes('infra')) return 'Infrastructure';
    return 'Other';
  }

  private normalizeBlockchain(blockchain: string): string {
    const normalized = blockchain.toLowerCase();
    if (normalized.includes('ethereum') || normalized.includes('eth')) return 'Ethereum';
    if (normalized.includes('arbitrum')) return 'Arbitrum';
    if (normalized.includes('optimism')) return 'Optimism';
    if (normalized.includes('polygon')) return 'Polygon';
    if (normalized.includes('bsc') || normalized.includes('bnb')) return 'BSC';
    if (normalized.includes('avalanche')) return 'Avalanche';
    if (normalized.includes('solana')) return 'Solana';
    return normalized;
  }

  private async saveAirdrops(airdrops: ScrapedAirdrop[], language: string): Promise<void> {
    for (const airdrop of airdrops) {
      try {
        // Check if airdrop already exists
        const { data: existing } = await supabase
          .from('airdrops')
          .select('id')
          .eq('name', airdrop.name)
          .single();

        if (!existing) {
          // Insert new airdrop
          await supabase.from('airdrops').insert({
            name: airdrop.name,
            description: airdrop.description,
            category: airdrop.category,
            blockchain: airdrop.blockchain,
            status: 'upcoming',
            china_restricted: language === 'chinese' ? false : true, // Simplified logic
            requirements: airdrop.requirements,
            eligibility_criteria: airdrop.eligibility_criteria,
            priority: this.calculatePriority(airdrop.category),
            potential_rating: this.calculatePotentialRating(airdrop.category)
          });
        }
      } catch (error) {
        console.error(`Failed to save airdrop ${airdrop.name}:`, error);
      }
    }
  }

  private calculatePriority(category: string): number {
    const priorities = {
      'Layer 2': 9,
      'DeFi': 8,
      'Infrastructure': 7,
      'Gaming': 6,
      'Social': 5,
      'Other': 3
    };
    return priorities[category as keyof typeof priorities] || 3;
  }

  private calculatePotentialRating(category: string): string {
    const ratings = {
      'Layer 2': 'very_high',
      'DeFi': 'high',
      'Infrastructure': 'high',
      'Gaming': 'medium',
      'Social': 'medium',
      'Other': 'low'
    };
    return ratings[category as keyof typeof ratings] || 'low';
  }

  private async logScrapingResult(sourceId: string, status: string, itemsFound: number, errorMessage?: string): Promise<void> {
    try {
      await supabase.from('scraping_logs').insert({
        source_id: sourceId,
        status,
        items_found: itemsFound,
        error_message: errorMessage
      });

      // Update source last_scraped timestamp
      await supabase
        .from('airdrop_sources')
        .update({ last_scraped: new Date().toISOString() })
        .eq('id', sourceId);
    } catch (error) {
      console.error('Failed to log scraping result:', error);
    }
  }

  // Initialize sources in database
  async initializeSources(): Promise<void> {
    for (const source of this.sources) {
      try {
        const { data: existing } = await supabase
          .from('airdrop_sources')
          .select('id')
          .eq('id', source.id)
          .single();

        if (!existing) {
          await supabase.from('airdrop_sources').insert({
            id: source.id,
            name: source.name,
            url: source.url,
            type: source.type,
            language: source.language,
            is_active: true
          });
        }
      } catch (error) {
        console.error(`Failed to initialize source ${source.id}:`, error);
      }
    }
  }
}

// Main execution if run as script
if (require.main === module) {
  const scraper = new AirdropScraper();
  scraper.initializeSources()
    .then(() => {
      console.log('Sources initialized. Starting scraping...');
      return scraper.scrapeAllSources();
    })
    .then(() => {
      console.log('Scraping completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Scraping failed:', error);
      process.exit(1);
    });
}

export default AirdropScraper;