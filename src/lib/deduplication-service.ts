import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface AirdropDuplicate {
  id: string;
  name: string;
  official_website?: string;
  twitter_handle?: string;
  contract_address?: string;
  similarity_score: number;
  match_type: 'exact_name' | 'similar_name' | 'same_website' | 'same_twitter' | 'same_contract';
}

export interface DeduplicationResult {
  is_duplicate: boolean;
  existing_airdrop?: AirdropDuplicate;
  confidence: number;
  recommended_action: 'skip' | 'merge' | 'update_existing';
}

export class DeduplicationService {
  /**
   * Check if an airdrop already exists in the database
   */
  async checkDuplicate(
    name: string,
    official_website?: string,
    twitter_handle?: string,
    contract_address?: string,
    description?: string
  ): Promise<DeduplicationResult> {
    const normalized_name = name.toLowerCase().trim();
    const normalized_website = official_website?.toLowerCase().trim();
    const normalized_twitter = twitter_handle?.toLowerCase().replace('@', '');

    // Check for exact name match
    const exactNameMatch = await this.checkExactNameMatch(normalized_name);
    if (exactNameMatch) {
      return {
        is_duplicate: true,
        existing_airdrop: exactNameMatch,
        confidence: 1.0,
        recommended_action: 'skip'
      };
    }

    // Check for similar name matches
    const similarNameMatches = await this.checkSimilarNameMatches(normalized_name);
    if (similarNameMatches.length > 0) {
      const bestMatch = similarNameMatches[0]; // Already sorted by similarity
      if (bestMatch.similarity_score > 0.8) {
        return {
          is_duplicate: true,
          existing_airdrop: bestMatch,
          confidence: bestMatch.similarity_score,
          recommended_action: bestMatch.similarity_score > 0.9 ? 'skip' : 'merge'
        };
      }
    }

    // Check for website match
    if (normalized_website) {
      const websiteMatch = await this.checkWebsiteMatch(normalized_website);
      if (websiteMatch) {
        return {
          is_duplicate: true,
          existing_airdrop: websiteMatch,
          confidence: 0.9,
          recommended_action: 'update_existing'
        };
      }
    }

    // Check for Twitter handle match
    if (normalized_twitter) {
      const twitterMatch = await this.checkTwitterMatch(normalized_twitter);
      if (twitterMatch) {
        return {
          is_duplicate: true,
          existing_airdrop: twitterMatch,
          confidence: 0.85,
          recommended_action: 'update_existing'
        };
      }
    }

    // Check for contract address match
    if (contract_address) {
      const contractMatch = await this.checkContractMatch(contract_address);
      if (contractMatch) {
        return {
          is_duplicate: true,
          existing_airdrop: contractMatch,
          confidence: 1.0,
          recommended_action: 'skip'
        };
      }
    }

    // Content similarity check if description is provided
    if (description) {
      const contentMatches = await this.checkContentSimilarity(description, normalized_name);
      if (contentMatches.length > 0) {
        const bestMatch = contentMatches[0];
        if (bestMatch.similarity_score > 0.7) {
          return {
            is_duplicate: true,
            existing_airdrop: bestMatch,
            confidence: bestMatch.similarity_score,
            recommended_action: 'merge'
          };
        }
      }
    }

    return {
      is_duplicate: false,
      confidence: 0,
      recommended_action: 'skip'
    };
  }

  /**
   * Check for exact name matches
   */
  private async checkExactNameMatch(normalizedName: string): Promise<AirdropDuplicate | null> {
    try {
      const { data, error } = await supabase
        .from('airdrops')
        .select('id, name, official_website, twitter_handle, contract_address')
        .eq('LOWER(name)', normalizedName)
        .limit(1);

      if (error || !data || data.length === 0) return null;

      const airdrop = data[0];
      return {
        id: airdrop.id,
        name: airdrop.name,
        official_website: airdrop.official_website,
        twitter_handle: airdrop.twitter_handle,
        contract_address: airdrop.contract_address,
        similarity_score: 1.0,
        match_type: 'exact_name'
      };
    } catch (error) {
      console.error('Error checking exact name match:', error);
      return null;
    }
  }

  /**
   * Check for similar name matches using string similarity
   */
  private async checkSimilarNameMatches(normalizedName: string): Promise<AirdropDuplicate[]> {
    try {
      const { data, error } = await supabase
        .from('airdrops')
        .select('id, name, official_website, twitter_handle, contract_address');

      if (error || !data) return [];

      const matches: AirdropDuplicate[] = [];

      for (const airdrop of data) {
        const similarity = this.calculateStringSimilarity(normalizedName, airdrop.name.toLowerCase());
        if (similarity > 0.6) { // Threshold for similarity
          matches.push({
            id: airdrop.id,
            name: airdrop.name,
            official_website: airdrop.official_website,
            twitter_handle: airdrop.twitter_handle,
            contract_address: airdrop.contract_address,
            similarity_score: similarity,
            match_type: 'similar_name'
          });
        }
      }

      return matches.sort((a, b) => b.similarity_score - a.similarity_score);
    } catch (error) {
      console.error('Error checking similar name matches:', error);
      return [];
    }
  }

  /**
   * Check for website matches
   */
  private async checkWebsiteMatch(normalizedWebsite: string): Promise<AirdropDuplicate | null> {
    try {
      // Extract domain for better matching
      const domain = this.extractDomain(normalizedWebsite);

      const { data, error } = await supabase
        .from('airdrops')
        .select('id, name, official_website, twitter_handle, contract_address')
        .ilike('official_website', `%${domain}%`)
        .limit(1);

      if (error || !data || data.length === 0) return null;

      const airdrop = data[0];
      return {
        id: airdrop.id,
        name: airdrop.name,
        official_website: airdrop.official_website,
        twitter_handle: airdrop.twitter_handle,
        contract_address: airdrop.contract_address,
        similarity_score: 0.9,
        match_type: 'same_website'
      };
    } catch (error) {
      console.error('Error checking website match:', error);
      return null;
    }
  }

  /**
   * Check for Twitter handle matches
   */
  private async checkTwitterMatch(normalizedTwitter: string): Promise<AirdropDuplicate | null> {
    try {
      const { data, error } = await supabase
        .from('airdrops')
        .select('id, name, official_website, twitter_handle, contract_address')
        .ilike('twitter_handle', `%${normalizedTwitter}%`)
        .limit(1);

      if (error || !data || data.length === 0) return null;

      const airdrop = data[0];
      return {
        id: airdrop.id,
        name: airdrop.name,
        official_website: airdrop.official_website,
        twitter_handle: airdrop.twitter_handle,
        contract_address: airdrop.contract_address,
        similarity_score: 0.85,
        match_type: 'same_twitter'
      };
    } catch (error) {
      console.error('Error checking Twitter match:', error);
      return null;
    }
  }

  /**
   * Check for contract address matches
   */
  private async checkContractMatch(contractAddress: string): Promise<AirdropDuplicate | null> {
    try {
      const { data, error } = await supabase
        .from('airdrops')
        .select('id, name, official_website, twitter_handle, contract_address')
        .eq('contract_address', contractAddress.toLowerCase())
        .limit(1);

      if (error || !data || data.length === 0) return null;

      const airdrop = data[0];
      return {
        id: airdrop.id,
        name: airdrop.name,
        official_website: airdrop.official_website,
        twitter_handle: airdrop.twitter_handle,
        contract_address: airdrop.contract_address,
        similarity_score: 1.0,
        match_type: 'same_contract'
      };
    } catch (error) {
      console.error('Error checking contract match:', error);
      return null;
    }
  }

  /**
   * Check for content similarity using description and keywords
   */
  private async checkContentSimilarity(description: string, normalizedName: string): Promise<AirdropDuplicate[]> {
    try {
      const { data, error } = await supabase
        .from('airdrops')
        .select('id, name, description, official_website, twitter_handle, contract_address')
        .not('description', 'is', null);

      if (error || !data) return [];

      const descriptionKeywords = this.extractKeywords(description);
      const matches: AirdropDuplicate[] = [];

      for (const airdrop of data) {
        if (!airdrop.description) continue;

        const existingKeywords = this.extractKeywords(airdrop.description);
        const similarity = this.calculateKeywordSimilarity(descriptionKeywords, existingKeywords);

        if (similarity > 0.5) {
          matches.push({
            id: airdrop.id,
            name: airdrop.name,
            official_website: airdrop.official_website,
            twitter_handle: airdrop.twitter_handle,
            contract_address: airdrop.contract_address,
            similarity_score: similarity,
            match_type: 'similar_name' // Using similar_name as content similarity type
          });
        }
      }

      return matches.sort((a, b) => b.similarity_score - a.similarity_score);
    } catch (error) {
      console.error('Error checking content similarity:', error);
      return [];
    }
  }

  /**
   * Calculate string similarity using Jaccard similarity
   */
  private calculateStringSimilarity(str1: string, str2: string): number {
    const words1 = new Set(str1.split(/\s+/).filter(w => w.length > 2));
    const words2 = new Set(str2.split(/\s+/).filter(w => w.length > 2));

    if (words1.size === 0 && words2.size === 0) return 1;
    if (words1.size === 0 || words2.size === 0) return 0;

    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);

    return intersection.size / union.size;
  }

  /**
   * Calculate keyword similarity
   */
  private calculateKeywordSimilarity(keywords1: Set<string>, keywords2: Set<string>): number {
    if (keywords1.size === 0 && keywords2.size === 0) return 1;
    if (keywords1.size === 0 || keywords2.size === 0) return 0;

    const intersection = new Set([...keywords1].filter(x => keywords2.has(x)));
    const union = new Set([...keywords1, ...keywords2]);

    return intersection.size / union.size;
  }

  /**
   * Extract keywords from text
   */
  private extractKeywords(text: string): Set<string> {
    const cryptoKeywords = new Set([
      'airdrop', 'token', 'crypto', 'blockchain', 'ethereum', 'bitcoin', 'defi',
      'nft', 'dao', 'web3', 'smart', 'contract', 'wallet', 'metamask',
      'claim', 'free', 'distribution', 'reward', 'staking', 'farming',
      'liquidity', 'yield', 'governance', 'protocol', 'dex', 'cex'
    ]);

    const words = text.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3)
      .filter(word => cryptoKeywords.has(word) || /^[a-z]+$/.test(word));

    return new Set(words);
  }

  /**
   * Extract domain from URL
   */
  private extractDomain(url: string): string {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  }

  /**
   * Generate content hash for tracking
   */
  generateContentHash(content: string): string {
    const normalized = content.toLowerCase().replace(/\s+/g, ' ').trim();
    return crypto.createHash('sha256').update(normalized).digest('hex').substring(0, 16);
  }

  /**
   * Clean up duplicate airdrops (admin function)
   */
  async cleanupDuplicates(): Promise<{ cleaned: number; errors: number }> {
    const { data: airdrops, error } = await supabase
      .from('airdrops')
      .select('id, name, official_website, twitter_handle, created_at')
      .order('created_at', { ascending: false });

    if (error || !airdrops) {
      return { cleaned: 0, errors: 1 };
    }

    const seen = new Map<string, string>(); // normalized name -> id
    let cleaned = 0;
    let errors = 0;

    for (const airdrop of airdrops) {
      const normalizedName = airdrop.name.toLowerCase().trim();

      if (seen.has(normalizedName)) {
        // Found duplicate, remove the older one
        try {
          const { error: deleteError } = await supabase
            .from('airdrops')
            .delete()
            .eq('id', airdrop.id);

          if (deleteError) {
            console.error(`Error deleting duplicate ${airdrop.name}:`, deleteError);
            errors++;
          } else {
            console.log(`Cleaned up duplicate: ${airdrop.name}`);
            cleaned++;
          }
        } catch (error) {
          console.error(`Error cleaning up duplicate ${airdrop.name}:`, error);
          errors++;
        }
      } else {
        seen.set(normalizedName, airdrop.id);
      }
    }

    return { cleaned, errors };
  }
}

export const deduplicationService = new DeduplicationService();