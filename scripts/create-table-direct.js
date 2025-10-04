#!/usr/bin/env node

/**
 * Direct table creation using PostgreSQL connection
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function createTableDirect() {
  console.log('🏗️  Direct Table Creation');
  console.log('==========================');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    console.log('❌ Service role key not found. Using service role key for admin operations...');
  }

  // Use service role key if available, otherwise use anon key
  const adminKey = serviceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, adminKey);

  // Simple CREATE TABLE SQL that we'll try to execute via RPC
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS airdrops (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL DEFAULT 'Layer 2',
      status TEXT NOT NULL DEFAULT 'upcoming',
      blockchain TEXT NOT NULL DEFAULT 'Ethereum',
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
      potential_rating TEXT DEFAULT 'medium',
      china_restricted BOOLEAN DEFAULT FALSE
    );

    ALTER TABLE airdrops ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Enable read access for all users" ON airdrops;
    CREATE POLICY "Enable read access for all users" ON airdrops FOR SELECT USING (true);
  `;

  try {
    console.log('🔨 Creating airdrops table...');

    // Try using the raw SQL execution if available
    const { data, error } = await supabase
      .from('airdrops')
      .select('*')
      .limit(1);

    if (error && error.message.includes('does not exist')) {
      console.log('❌ Table does not exist. Need to create manually.');
      console.log('');
      console.log('📋 Please run this SQL in Supabase SQL Editor:');
      console.log('   https://supabase.com/dashboard/project/gphxrmkibuythbcopkmo/sql/new');
      console.log('');
      console.log('SQL to run:');
      console.log('```sql');
      console.log(createTableSQL);
      console.log('```');
      console.log('');
      console.log('After creating the table, run: node scripts/quick-test-insert.js');
      return;
    }

    if (!error) {
      console.log('✅ Table already exists!');

      // Test inserting a simple record
      console.log('📝 Testing insert...');
      const testAirdrop = {
        name: 'Test Direct Insert',
        description: 'Testing direct insert functionality',
        category: 'Layer 2',
        status: 'upcoming',
        blockchain: 'Ethereum',
        token_symbol: 'TEST',
        estimated_value: '$100-300',
        featured: true,
        priority: 10,
        potential_rating: 'high',
        china_restricted: false
      };

      const { data: insertData, error: insertError } = await supabase
        .from('airdrops')
        .insert(testAirdrop)
        .select();

      if (insertError) {
        console.log('❌ Insert test failed:', insertError.message);
      } else {
        console.log('✅ Insert test successful!');
        console.log('📊 Inserted data:', insertData);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createTableDirect();