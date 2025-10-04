import axios from 'axios';
import * as cheerio from 'cheerio';
import puppeteer, { Browser, Page } from 'puppeteer';
import { TwitterApi } from 'twitter-api-v2';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface EnhancedAirdropSource {
  id: string;
  name: string;
  url: string;
  type: 'twitter' | 'website' | 'github' | 'forum' | 'rss' | 'api';
  language: 'english' | 'chinese';
  priority: number;
  selectors?: {
    container?: string;
    name?: string;
    description?: string;
    category?: string;
    blockchain?: string;
    website?: string;
    twitter?: string;
    requirements?: string;
  };
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
  estimated_value?: string;
  token_symbol?: string;
  source_id: string;
  source_url: string;
  scraped_at: string;
  content_hash: string;
}

interface DuplicationCheckResult {
  isDuplicate: boolean;
  existingId?: string;
  matchType?: 'exact_name' | 'similar_content' | 'same_website' | 'same_twitter';
}

class EnhancedAirdropScraper {
  private sources: EnhancedAirdropSource[] = [
    {
      id: 'x_com_airdrops',
      name: 'X.com Airdrop Hunters',
      url: 'https://twitter.com/search?q=%23airdrop%20%23crypto&src=typed_query',
      type: 'twitter',
      language: 'english',
      priority: 10
    },
    {
      id: 'defi_deals',
      name: 'DeFi Deals Airdrops',
      url: 'https://defi-deals.com/airdrops',
      type: 'website',
      language: 'english',
      priority: 8,
      selectors: {
        container: '.airdrop-card',
        name: 'h3.airdrop-title',
        description: '.airdrop-description',
        category: '.airdrop-category',
        blockchain: '.airdrop-chain',
        website: '.airdrop-website'
      }
    },
    {
      id: 'alpha_airdrops',
      name: 'Alpha Airdrops',
      url: 'https://alpha.airdrops.io',
      type: 'website',
      language: 'english',
      priority: 8,
      selectors: {
        container: '.airdrop-item',
        name: '.project-name',
        description: '.project-desc',
        category: '.project-category',
        blockchain: '.project-chain'
      }
    },
    {
      id: 'crypto_potato',
      name: 'CryptoPotato Airdrops',
      url: 'https://cryptopotato.com/crypto-airdrops/',
      type: 'website',
      language: 'english',
      priority: 7,
      selectors: {
        container: '.airdrop-entry',
        name: 'h3',
        description: 'p',
        category: '.category-tag',
        blockchain: '.chain-tag'
      }
    },
    {
      id: 'airdrop_alert',
      name: 'Airdrop Alert',
      url: 'https://airdropalert.com',
      type: 'website',
      language: 'english',
      priority: 9,
      selectors: {
        container: '.card-airdrop',
        name: '.card-title',
        description: '.card-text',
        category: '.badge-category',
        blockchain: '.badge-chain'
      }
    }
  ];

  private browser: Browser | null = null;
  private twitterClient: TwitterApi | null = null;

  async initialize(): Promise<void> {
    console.log('🚀 Initializing Enhanced Airdrop Scraper...');

    // Initialize Puppeteer for JavaScript-heavy sites
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Initialize Twitter client if credentials are available
    if (process.env.TWITTER_API_KEY && process.env.TWITTER_API_SECRET) {
      this.twitterClient = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY,
        appSecret: process.env.TWITTER_API_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      });
    }

    // Initialize sources in database
    await this.initializeSources();
  }

  async scrapeAllSources(): Promise<ScrapedAirdrop[]> {
    console.log('🕷️  Starting enhanced scraping of all sources...');
    const allAirdrops: ScrapedAirdrop[] = [];

    for (const source of this.sources.sort((a, b) => b.priority - a.priority)) {
      try {
        const airdrops = await this.scrapeSource(source);
        allAirdrops.push(...airdrops);

        await this.logScrapingResult(source.id, 'success', airdrops.length);

        // Add delay between requests to be respectful
        await this.delay(Math.random() * 2000 + 1000);

      } catch (error) {
        console.error(`❌ Failed to scrape ${source.name}:`, error);
        await this.logScrapingResult(source.id, 'failed', 0, error instanceof Error ? error.message : 'Unknown error');
      }
    }

    // Remove duplicates before returning
    const uniqueAirdrops = await this.removeDuplicates(allAirdrops);
    console.log(`✅ Found ${allAirdrops.length} total airdrops, ${uniqueAirdrops.length} unique after deduplication`);

    return uniqueAirdrops;
  }

  private async scrapeSource(source: EnhancedAirdropSource): Promise<ScrapedAirdrop[]> {
    console.log(`🔍 Scraping ${source.name} (${source.type})...`);

    switch (source.type) {
      case 'twitter':
        return await this.scrapeTwitter(source);
      case 'website':
        return await this.scrapeWebsite(source);
      case 'api':
        return await this.scrapeApi(source);
      default:
        console.log(`⚠️  Scraper for ${source.type} not implemented yet`);
        return [];
    }
  }

  private async scrapeTwitter(source: EnhancedAirdropSource): Promise<ScrapedAirdrop[]> {
    if (!this.twitterClient) {
      console.log('⚠️  Twitter client not initialized, using web scraping fallback');
      return await this.scrapeTwitterWeb(source);
    }

    try {
      // Search for airdrop-related tweets
      const searchResult = await this.twitterClient.v2.search('#airdrop crypto', {
        'tweet.fields': ['created_at', 'author_id', 'public_metrics'],
        'user.fields': ['username', 'verified', 'public_metrics'],
        'max_results': 100
      });

      const airdrops: ScrapedAirdrop[] = [];

      if (searchResult.data) {
        for (const tweet of searchResult.data.data) {
          const user = searchResult.data.includes?.users?.find(u => u.id === tweet.author_id);
          if (!user) continue;

          // Extract airdrop information from tweet
          const airdropInfo = this.extractAirdropFromTweet(tweet.text, user.username);
          if (airdropInfo) {
            airdrops.push({
              ...airdropInfo,
              source_id: source.id,
              source_url: `https://twitter.com/${user.username}/status/${tweet.id}`,
              scraped_at: new Date().toISOString(),
              content_hash: this.generateContentHash(tweet.text)
            });
          }
        }
      }

      return airdrops;
    } catch (error) {
      console.error('Twitter API error, falling back to web scraping:', error);
      return await this.scrapeTwitterWeb(source);
    }
  }

  private async scrapeTwitterWeb(source: EnhancedAirdropSource): Promise<ScrapedAirdrop[]> {
    if (!this.browser) return [];

    const page = await this.browser.newPage();
    const airdrops: ScrapedAirdrop[] = [];

    try {
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      await page.goto(source.url, { waitUntil: 'networkidle2' });

      // Wait for content to load
      await page.waitForSelector('article', { timeout: 10000 });

      // Extract tweets
      const tweets = await page.$$eval('article', (articles) => {
        return articles.map(article => {
          const textElement = article.querySelector('[data-testid="tweetText"]');
          const userElement = article.querySelector('[data-testid="User-Name"]');
          const linkElement = article.querySelector('a[href*="/status/"]');

          return {
            text: textElement?.textContent || '',
            user: userElement?.textContent || '',
            link: linkElement?.href || ''
          };
        });
      });

      for (const tweet of tweets) {
        const airdropInfo = this.extractAirdropFromTweet(tweet.text, tweet.user);
        if (airdropInfo) {
          airdrops.push({
            ...airdropInfo,
            source_id: source.id,
            source_url: tweet.link,
            scraped_at: new Date().toISOString(),
            content_hash: this.generateContentHash(tweet.text)
          });
        }
      }

    } catch (error) {
      console.error('Twitter web scraping error:', error);
    } finally {
      await page.close();
    }

    return airdrops;
  }

  private extractAirdropFromTweet(text: string, user: string): Partial<ScrapedAirdrop> | null {
    // Keywords and patterns to identify airdrop tweets
    const airdropKeywords = [
      'airdrop', 'claim', 'free', 'token', 'crypto', 'blockchain',
      'ethereum', 'btc', 'solana', 'arbitrum', 'optimism'
    ];

    const hasKeywords = airdropKeywords.some(keyword =>
      text.toLowerCase().includes(keyword.toLowerCase())
    );

    if (!hasKeywords) return null;

    // Extract project name (usually mentioned first or in all caps)
    const nameMatch = text.match(/^([A-Z][a-zA-Z0-9\s]+?)(?:\s+(?:airdrop|claim|free))/i);
    const name = nameMatch ? nameMatch[1].trim() : text.split(' ').slice(0, 3).join(' ');

    // Extract potential website
    const websiteMatch = text.match(/https?:\/\/([^\s]+)/);
    const official_website = websiteMatch ? websiteMatch[0] : undefined;

    return {
      name: name.length > 50 ? name.substring(0, 50) + '...' : name,
      description: text.length > 200 ? text.substring(0, 200) + '...' : text,
      category: 'Other', // Will be normalized later
      blockchain: 'Ethereum', // Default, will be updated if detected
      official_website,
      twitter_handle: user.startsWith('@') ? user : `@${user}`,
      requirements: ['Check tweet for details']
    };
  }

  private async scrapeWebsite(source: EnhancedAirdropSource): Promise<ScrapedAirdrop[]> {
    const airdrops: ScrapedAirdrop[] = [];
    let $: cheerio.CheerioAPI;

    try {
      // Try regular HTTP request first
      const response = await axios.get(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });

      $ = cheerio.load(response.data);
    } catch (error) {
      // If regular request fails, try with Puppeteer
      if (!this.browser) throw error;

      const page = await this.browser.newPage();
      try {
        await page.goto(source.url, { waitUntil: 'networkidle2' });
        const content = await page.content();
        $ = cheerio.load(content);
      } finally {
        await page.close();
      }
    }

    const containerSelector = source.selectors?.container || '.airdrop, .airdrop-item, [class*="airdrop"]';
    const nameSelector = source.selectors?.name || 'h1, h2, h3, .title, .name';
    const descriptionSelector = source.selectors?.description || 'p, .description, .desc';
    const categorySelector = source.selectors?.category || '.category, .tag, .badge';
    const blockchainSelector = source.selectors?.blockchain || '.blockchain, .chain, .network';
    const websiteSelector = source.selectors?.website || 'a[href*="http"], .website, .link';

    $(containerSelector).each((index, element) => {
      const $element = $(element);

      const name = $element.find(nameSelector).first().text().trim();
      const description = $element.find(descriptionSelector).first().text().trim();
      const category = $element.find(categorySelector).first().text().trim();
      const blockchain = $element.find(blockchainSelector).first().text().trim();
      const website = $element.find(websiteSelector).first().attr('href');

      if (name && this.isValidAirdrop(name, description)) {
        airdrops.push({
          name: this.cleanText(name),
          description: this.cleanText(description) || undefined,
          category: this.normalizeCategory(category),
          blockchain: this.normalizeBlockchain(blockchain),
          official_website: website ? this.cleanUrl(website) : undefined,
          requirements: this.extractRequirements(description),
          eligibility_criteria: this.extractEligibilityCriteria(description),
          source_id: source.id,
          source_url: source.url,
          scraped_at: new Date().toISOString(),
          content_hash: this.generateContentHash(name + description)
        });
      }
    });

    return airdrops;
  }

  private async scrapeApi(source: EnhancedAirdropSource): Promise<ScrapedAirdrop[]> {
    // Implementation for API-based sources
    console.log(`🔌 API scraping for ${source.name} not implemented yet`);
    return [];
  }

  private isValidAirdrop(name: string, description: string): boolean {
    const invalidKeywords = ['test', 'demo', 'example', 'sample', 'placeholder'];
    const validKeywords = ['airdrop', 'token', 'crypto', 'claim', 'free'];

    const hasInvalidKeyword = invalidKeywords.some(keyword =>
      name.toLowerCase().includes(keyword) || description.toLowerCase().includes(keyword)
    );

    const hasValidKeyword = validKeywords.some(keyword =>
      name.toLowerCase().includes(keyword) || description.toLowerCase().includes(keyword)
    );

    return !hasInvalidKeyword && (hasValidKeyword || name.length > 3);
  }

  private cleanText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }

  private cleanUrl(url: string): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return 'https:' + url;
    return 'https://' + url;
  }

  private normalizeCategory(category: string): string {
    if (!category) return 'Other';

    const normalized = category.toLowerCase();
    if (normalized.includes('layer') || normalized.includes('l2')) return 'Layer 2';
    if (normalized.includes('defi') || normalized.includes('finance')) return 'DeFi';
    if (normalized.includes('game') || normalized.includes('gaming')) return 'Gaming';
    if (normalized.includes('social') || normalized.includes('community')) return 'Social';
    if (normalized.includes('infra') || normalized.includes('infrastructure')) return 'Infrastructure';
    if (normalized.includes('nft')) return 'NFT';
    if (normalized.includes('dao')) return 'DAO';
    return 'Other';
  }

  private normalizeBlockchain(blockchain: string): string {
    if (!blockchain) return 'Ethereum';

    const normalized = blockchain.toLowerCase();
    if (normalized.includes('ethereum') || normalized.includes('eth')) return 'Ethereum';
    if (normalized.includes('arbitrum')) return 'Arbitrum';
    if (normalized.includes('optimism')) return 'Optimism';
    if (normalized.includes('polygon')) return 'Polygon';
    if (normalized.includes('bsc') || normalized.includes('bnb')) return 'BSC';
    if (normalized.includes('avalanche')) return 'Avalanche';
    if (normalized.includes('solana')) return 'Solana';
    if (normalized.includes('base')) return 'Base';
    if (normalized.includes('zksync')) return 'zkSync';
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }

  private extractRequirements(text: string): string[] {
    const requirements: string[] = [];

    const requirementPatterns = [
      /follow\s+(.+)/gi,
      /retweet\s+(.+)/gi,
      /like\s+(.+)/gi,
      /join\s+(.+)/gi,
      /connect\s+(.+)/gi,
      /hold\s+(.+)/gi
    ];

    requirementPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        requirements.push(...matches.map(m => m.trim()));
      }
    });

    return requirements.length > 0 ? requirements : ['Check official website for requirements'];
  }

  private extractEligibilityCriteria(text: string): string[] {
    const criteria: string[] = [];

    if (text.toLowerCase().includes('whitelist')) {
      criteria.push('Whitelist required');
    }
    if (text.toLowerCase().includes('snapshot')) {
      criteria.push('Snapshot based');
    }
    if (text.toLowerCase().includes('hold')) {
      criteria.push('Token holding required');
    }
    if (text.toLowerCase().includes('testnet')) {
      criteria.push('Testnet interaction required');
    }

    return criteria.length > 0 ? criteria : ['No specific criteria mentioned'];
  }

  private generateContentHash(content: string): string {
    return crypto.createHash('sha256').update(content.toLowerCase().trim()).digest('hex').substring(0, 16);
  }

  private async removeDuplicates(airdrops: ScrapedAirdrop[]): Promise<ScrapedAirdrop[]> {
    const uniqueAirdrops: ScrapedAirdrop[] = [];
    const seenNames = new Set<string>();
    const seenWebsites = new Set<string>();
    const seenContentHashes = new Set<string>();

    for (const airdrop of airdrops) {
      const nameKey = airdrop.name.toLowerCase().trim();
      const websiteKey = airdrop.official_website?.toLowerCase().trim();
      const contentHashKey = airdrop.content_hash;

      // Check for duplicates
      const isDuplicate = seenNames.has(nameKey) ||
                         (websiteKey && seenWebsites.has(websiteKey)) ||
                         seenContentHashes.has(contentHashKey);

      if (!isDuplicate) {
        uniqueAirdrops.push(airdrop);
        seenNames.add(nameKey);
        if (websiteKey) seenWebsites.add(websiteKey);
        seenContentHashes.add(contentHashKey);
      }
    }

    return uniqueAirdrops;
  }

  async checkDuplication(airdrop: ScrapedAirdrop): Promise<DuplicationCheckResult> {
    try {
      // Check exact name match
      const { data: exactMatch } = await supabase
        .from('airdrops')
        .select('id, name')
        .ilike('name', airdrop.name)
        .single();

      if (exactMatch) {
        return { isDuplicate: true, existingId: exactMatch.id, matchType: 'exact_name' };
      }

      // Check website match
      if (airdrop.official_website) {
        const { data: websiteMatch } = await supabase
          .from('airdrops')
          .select('id, official_website')
          .ilike('official_website', `%${this.extractDomain(airdrop.official_website)}%`)
          .single();

        if (websiteMatch) {
          return { isDuplicate: true, existingId: websiteMatch.id, matchType: 'same_website' };
        }
      }

      // Check Twitter handle match
      if (airdrop.twitter_handle) {
        const { data: twitterMatch } = await supabase
          .from('airdrops')
          .select('id, twitter_handle')
          .ilike('twitter_handle', airdrop.twitter_handle)
          .single();

        if (twitterMatch) {
          return { isDuplicate: true, existingId: twitterMatch.id, matchType: 'same_twitter' };
        }
      }

      return { isDuplicate: false };

    } catch (error) {
      console.error('Error checking duplication:', error);
      return { isDuplicate: false };
    }
  }

  private extractDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  }

  async saveAirdrops(airdrops: ScrapedAirdrop[]): Promise<{ success: number; duplicates: number; errors: number }> {
    let success = 0;
    let duplicates = 0;
    let errors = 0;

    for (const airdrop of airdrops) {
      try {
        const duplicationCheck = await this.checkDuplication(airdrop);

        if (duplicationCheck.isDuplicate) {
          console.log(`🔄 Duplicate found: ${airdrop.name} (${duplicationCheck.matchType})`);
          duplicates++;
          continue;
        }

        // Insert new airdrop
        const { error } = await supabase.from('airdrops').insert({
          name: airdrop.name,
          description: airdrop.description,
          category: airdrop.category,
          blockchain: airdrop.blockchain,
          status: 'upcoming',
          official_website: airdrop.official_website,
          twitter_handle: airdrop.twitter_handle,
          requirements: airdrop.requirements,
          eligibility_criteria: airdrop.eligibility_criteria,
          china_restricted: airdrop.source_language === 'chinese' ? false : true,
          priority: this.calculatePriority(airdrop.category),
          potential_rating: this.calculatePotentialRating(airdrop.category),
          source_id: airdrop.source_id,
          scraped_at: airdrop.scraped_at
        });

        if (error) {
          console.error(`Failed to save airdrop ${airdrop.name}:`, error);
          errors++;
        } else {
          success++;
        }
      } catch (error) {
        console.error(`Error processing airdrop ${airdrop.name}:`, error);
        errors++;
      }
    }

    return { success, duplicates, errors };
  }

  private calculatePriority(category: string): number {
    const priorities = {
      'Layer 2': 9,
      'DeFi': 8,
      'Infrastructure': 7,
      'Gaming': 6,
      'Social': 5,
      'NFT': 4,
      'DAO': 4,
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
      'NFT': 'medium',
      'DAO': 'low',
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

  private async initializeSources(): Promise<void> {
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

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

// Main execution if run as script
if (require.main === module) {
  const scraper = new EnhancedAirdropScraper();

  scraper.initialize()
    .then(() => {
      console.log('✅ Enhanced scraper initialized. Starting scraping...');
      return scraper.scrapeAllSources();
    })
    .then(async (airdrops) => {
      console.log(`📊 Saving ${airdrops.length} unique airdrops to database...`);
      const result = await scraper.saveAirdrops(airdrops);
      console.log(`✅ Results: ${result.success} saved, ${result.duplicates} duplicates, ${result.errors} errors`);
      await scraper.cleanup();
      process.exit(0);
    })
    .catch(async (error) => {
      console.error('❌ Enhanced scraping failed:', error);
      await scraper.cleanup();
      process.exit(1);
    });
}

export default EnhancedAirdropScraper;