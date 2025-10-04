import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    const search = searchParams.get('search');

    const client = await pool.connect();

    try {
      let query = 'SELECT * FROM airdrops WHERE 1=1';
      const values: any[] = [];
      let paramIndex = 1;

      if (category && category !== 'all') {
        query += ` AND category = $${paramIndex++}`;
        values.push(category);
      }

      if (status && status !== 'all') {
        query += ` AND status = $${paramIndex++}`;
        values.push(status);
      }

      if (featured !== null) {
        query += ` AND featured = $${paramIndex++}`;
        values.push(featured === 'true');
      }

      if (search) {
        query += ` AND (name ILIKE $${paramIndex++} OR description ILIKE $${paramIndex++})`;
        values.push(`%${search}%`, `%${search}%`);
      }

      query += ' ORDER BY priority DESC, created_at DESC';

      if (limit) {
        query += ` LIMIT $${paramIndex++}`;
        values.push(parseInt(limit));
      }

      if (offset) {
        query += ` OFFSET $${paramIndex++}`;
        values.push(parseInt(offset));
      }

      const result = await client.query(query, values);

      // Add official_links array for compatibility
      const airdrops = result.rows.map(row => ({
        ...row,
        official_links: []
      }));

      return NextResponse.json({ success: true, data: airdrops });

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch airdrops' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const client = await pool.connect();

    try {
      const insertSQL = `
        INSERT INTO airdrops (name, description, category, status, blockchain, token_symbol, estimated_value, eligibility_criteria, requirements, official_website, twitter_handle, discord_link, featured, priority, potential_rating, china_restricted)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING id, name, category, status;
      `;

      const values = [
        body.name,
        body.description,
        body.category || 'Layer 2',
        body.status || 'upcoming',
        body.blockchain || 'Ethereum',
        body.token_symbol,
        body.estimated_value,
        body.eligibility_criteria || [],
        body.requirements || [],
        body.official_website,
        body.twitter_handle,
        body.discord_link,
        body.featured || false,
        body.priority || 0,
        body.potential_rating || 'medium',
        body.china_restricted || false
      ];

      const result = await client.query(insertSQL, values);

      return NextResponse.json({
        success: true,
        message: 'Airdrop created successfully',
        data: result.rows[0]
      });

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create airdrop' },
      { status: 500 }
    );
  }
}