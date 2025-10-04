#!/usr/bin/env node

/**
 * Direct Database Schema Creation Script
 * This script connects directly to PostgreSQL and creates the schema
 */

const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function createSchema() {
  console.log('🏗️  Creating Database Schema');
  console.log('===========================');

  const dbUrl = process.env.SUPABASE_DB_URL;

  if (!dbUrl) {
    console.log('❌ SUPABASE_DB_URL not found in environment variables');
    process.exit(1);
  }

  console.log('🔗 Connecting to PostgreSQL database...');

  const client = new Client({
    connectionString: dbUrl
  });

  try {
    await client.connect();
    console.log('✅ Database connection successful');

    // Create the schema
    console.log('📊 Creating airdrops table...');

    const createAirdropsTable = `
      CREATE TABLE IF NOT EXISTS airdrops (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'upcoming',
        blockchain TEXT NOT NULL,
        token_symbol TEXT,
        estimated_value TEXT,
        eligibility_criteria TEXT[],
        requirements TEXT[],
        official_website TEXT,
        twitter_handle TEXT,
        discord_link TEXT,
        telegram_link TEXT,
        contract_address TEXT,
        distribution_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        featured BOOLEAN DEFAULT FALSE,
        priority INTEGER DEFAULT 0,
        potential_rating TEXT CHECK (potential_rating IN ('low', 'medium', 'high', 'very_high')),
        china_restricted BOOLEAN DEFAULT FALSE
      );
    `;

    await client.query(createAirdropsTable);
    console.log('✅ Airdrops table created');

    // Create indexes
    console.log('📈 Creating indexes...');
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_airdrops_status ON airdrops(status);',
      'CREATE INDEX IF NOT EXISTS idx_airdrops_category ON airdrops(category);',
      'CREATE INDEX IF NOT EXISTS idx_airdrops_blockchain ON airdrops(blockchain);',
      'CREATE INDEX IF NOT EXISTS idx_airdrops_priority ON airdrops(priority DESC);',
      'CREATE INDEX IF NOT EXISTS idx_airdrops_featured ON airdrops(featured);'
    ];

    for (const indexQuery of indexes) {
      await client.query(indexQuery);
    }
    console.log('✅ Indexes created');

    // Create updated_at trigger function
    console.log('⚙️  Creating trigger function...');
    const createTriggerFunction = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `;

    await client.query(createTriggerFunction);
    console.log('✅ Trigger function created');

    // Create trigger
    console.log('🔧 Creating trigger...');
    const createTrigger = `
      DROP TRIGGER IF EXISTS update_airdrops_updated_at ON airdrops;
      CREATE TRIGGER update_airdrops_updated_at BEFORE UPDATE ON airdrops
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `;

    await client.query(createTrigger);
    console.log('✅ Trigger created');

    // Enable RLS
    console.log('🔒 Enabling Row Level Security...');
    await client.query('ALTER TABLE airdrops ENABLE ROW LEVEL SECURITY;');

    // Create policy for public read access
    const createPolicy = `
      DROP POLICY IF EXISTS "Enable read access for all users" ON airdrops;
      CREATE POLICY "Enable read access for all users" ON airdrops
        FOR SELECT USING (true);
    `;

    await client.query(createPolicy);
    console.log('✅ RLS policies created');

    console.log('');
    console.log('🎉 Database schema created successfully!');

  } catch (error) {
    console.error('❌ Error creating schema:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

createSchema();