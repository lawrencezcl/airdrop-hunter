// API client for database operations

export interface Airdrop {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  blockchain: string;
  token_symbol: string;
  estimated_value: string;
  eligibility_criteria: string[];
  requirements: string[];
  official_website: string;
  twitter_handle: string;
  discord_link: string;
  telegram_link: string | null;
  contract_address: string | null;
  distribution_date: string | null;
  created_at: string;
  updated_at: string;
  featured: boolean;
  priority: number;
  potential_rating: string;
  china_restricted: boolean;
  official_links?: any[];
}

export class ApiClient {
  private static baseUrl = '/api';

  // Get all airdrops
  static async getAirdrops(filters?: {
    category?: string;
    status?: string;
    blockchain?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
    search?: string;
  }): Promise<Airdrop[]> {
    try {
      const params = new URLSearchParams();

      if (filters?.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters?.status && filters.status !== 'all') {
        params.append('status', filters.status);
      }
      if (filters?.blockchain && filters.blockchain !== 'all') {
        params.append('blockchain', filters.blockchain);
      }
      if (filters?.featured !== undefined) {
        params.append('featured', filters.featured.toString());
      }
      if (filters?.limit) {
        params.append('limit', filters.limit.toString());
      }
      if (filters?.offset) {
        params.append('offset', filters.offset.toString());
      }
      if (filters?.search) {
        params.append('search', filters.search);
      }

      const response = await fetch(`${this.baseUrl}/airdrops?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching airdrops:', error);
      throw error;
    }
  }

  // Get featured airdrops
  static async getFeaturedAirdrops(limit: number = 3): Promise<Airdrop[]> {
    return this.getAirdrops({
      featured: true,
      limit
    });
  }

  // Get airdrops by status
  static async getAirdropsByStatus(status: string, limit: number = 10): Promise<Airdrop[]> {
    return this.getAirdrops({
      status,
      limit
    });
  }

  // Search airdrops
  static async searchAirdrops(searchTerm: string, limit: number = 20): Promise<Airdrop[]> {
    return this.getAirdrops({
      search: searchTerm,
      limit
    });
  }

  // Get airdrop by ID
  static async getAirdropById(id: string): Promise<Airdrop | null> {
    try {
      const response = await fetch(`${this.baseUrl}/airdrops/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data || null;
    } catch (error) {
      console.error('Error fetching airdrop by ID:', error);
      throw error;
    }
  }

  // Get statistics
  static async getStats(): Promise<{
    total: number;
    upcoming: number;
    confirmed: number;
    distributed: number;
    featured: number;
  }> {
    try {
      const [totalResult, upcomingResult, confirmedResult, distributedResult, featuredResult] = await Promise.all([
        this.getAirdrops({ limit: 1000 }),
        this.getAirdrops({ status: 'upcoming', limit: 1000 }),
        this.getAirdrops({ status: 'confirmed', limit: 1000 }),
        this.getAirdrops({ status: 'distributed', limit: 1000 }),
        this.getAirdrops({ featured: true, limit: 1000 })
      ]);

      return {
        total: totalResult.length,
        upcoming: upcomingResult.length,
        confirmed: confirmedResult.length,
        distributed: distributedResult.length,
        featured: featuredResult.length
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }

  // Test database connection
  static async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/airdrops?limit=1`);
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

// Export default instance
export const apiClient = ApiClient;