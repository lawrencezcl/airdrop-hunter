import { Pool } from 'pg';

// Neon database connection
const neonDbUrl = process.env.NEON_DB_URL;

if (!neonDbUrl) {
  throw new Error('NEON_DB_URL environment variable is not set');
}

// Create a connection pool
const pool = new Pool({
  connectionString: neonDbUrl,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

// Airdrop interface
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
  official_links?: any[]; // For compatibility with existing code
}

// Database service for Neon
export class NeonDbService {
  // Get all airdrops
  static async getAirdrops(filters?: {
    category?: string;
    status?: string;
    blockchain?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Airdrop[]> {
    const client = await pool.connect();

    try {
      let query = 'SELECT * FROM airdrops WHERE 1=1';
      const values: any[] = [];
      let paramIndex = 1;

      if (filters?.category && filters.category !== 'all') {
        query += ` AND category = $${paramIndex++}`;
        values.push(filters.category);
      }

      if (filters?.status && filters.status !== 'all') {
        query += ` AND status = $${paramIndex++}`;
        values.push(filters.status);
      }

      if (filters?.blockchain && filters.blockchain !== 'all') {
        query += ` AND blockchain = $${paramIndex++}`;
        values.push(filters.blockchain);
      }

      if (filters?.featured !== undefined) {
        query += ` AND featured = $${paramIndex++}`;
        values.push(filters.featured);
      }

      query += ' ORDER BY priority DESC, created_at DESC';

      if (filters?.limit) {
        query += ` LIMIT $${paramIndex++}`;
        values.push(filters.limit);
      }

      if (filters?.offset) {
        query += ` OFFSET $${paramIndex++}`;
        values.push(filters.offset);
      }

      const result = await client.query(query, values);

      return result.rows.map(row => ({
        ...row,
        official_links: [] // Add empty array for compatibility
      }));
    } finally {
      client.release();
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
    const client = await pool.connect();

    try {
      const query = `
        SELECT * FROM airdrops
        WHERE name ILIKE $1 OR description ILIKE $1 OR token_symbol ILIKE $1
        ORDER BY priority DESC, created_at DESC
        LIMIT $2
      `;

      const result = await client.query(query, [`%${searchTerm}%`, limit]);

      return result.rows.map(row => ({
        ...row,
        official_links: [] // Add empty array for compatibility
      }));
    } finally {
      client.release();
    }
  }

  // Get airdrop by ID
  static async getAirdropById(id: string): Promise<Airdrop | null> {
    const client = await pool.connect();

    try {
      const result = await client.query('SELECT * FROM airdrops WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        return null;
      }

      return {
        ...result.rows[0],
        official_links: [] // Add empty array for compatibility
      };
    } finally {
      client.release();
    }
  }

  // Get airdrop statistics
  static async getStats(): Promise<{
    total: number;
    upcoming: number;
    confirmed: number;
    distributed: number;
    featured: number;
  }> {
    const client = await pool.connect();

    try {
      const [totalResult, statusResult, featuredResult] = await Promise.all([
        client.query('SELECT COUNT(*) as count FROM airdrops'),
        client.query('SELECT status, COUNT(*) as count FROM airdrops GROUP BY status'),
        client.query('SELECT COUNT(*) as count FROM airdrops WHERE featured = true')
      ]);

      const stats = {
        total: parseInt(totalResult.rows[0].count),
        upcoming: 0,
        confirmed: 0,
        distributed: 0,
        featured: parseInt(featuredResult.rows[0].count)
      };

      statusResult.rows.forEach(row => {
        stats[row.status as keyof typeof stats] = parseInt(row.count);
      });

      return stats;
    } finally {
      client.release();
    }
  }

  // Test database connection
  static async testConnection(): Promise<boolean> {
    const client = await pool.connect();

    try {
      await client.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    } finally {
      client.release();
    }
  }
}

// Export a default instance for convenience
export const neonDb = NeonDbService;