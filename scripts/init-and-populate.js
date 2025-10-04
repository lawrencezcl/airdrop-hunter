#!/usr/bin/env node

/**
 * Complete Database Initialization and Population Script
 * This script will create the schema and populate it with real airdrop data
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function initAndPopulateDatabase() {
  console.log('🚀 Complete Database Initialization');
  console.log('===================================');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.log('❌ Supabase credentials not found');
    process.exit(1);
  }

  console.log('🔗 Connecting to Supabase...');
  console.log('   URL:', supabaseUrl);

  // Try with service role key first for admin operations
  const adminClient = createClient(supabaseUrl, serviceRoleKey || supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const publicClient = createClient(supabaseUrl, supabaseAnonKey);

  // SQL to create the complete schema
  const schemaSQL = `
    -- Create airdrops table
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

    -- Enable Row Level Security
    ALTER TABLE airdrops ENABLE ROW LEVEL SECURITY;

    -- Create policy for public read access
    DROP POLICY IF EXISTS "Enable read access for all users" ON airdrops;
    CREATE POLICY "Enable read access for all users" ON airdrops
      FOR SELECT USING (true);

    -- Create indexes
    CREATE INDEX IF NOT EXISTS idx_airdrops_status ON airdrops(status);
    CREATE INDEX IF NOT EXISTS idx_airdrops_category ON airdrops(category);
    CREATE INDEX IF NOT EXISTS idx_airdrops_blockchain ON airdrops(blockchain);
    CREATE INDEX IF NOT EXISTS idx_airdrops_priority ON airdrops(priority DESC);
    CREATE INDEX IF NOT EXISTS idx_airdrops_featured ON airdrops(featured);

    -- Create trigger function
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';

    -- Create trigger
    DROP TRIGGER IF EXISTS update_airdrops_updated_at ON airdrops;
    CREATE TRIGGER update_airdrops_updated_at BEFORE UPDATE ON airdrops
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  `;

  try {
    console.log('🏗️  Creating database schema...');

    // Execute the schema creation
    const { error: schemaError } = await adminClient.rpc('exec_sql', { sql: schemaSQL });

    if (schemaError) {
      console.log('⚠️  Schema creation with RPC failed, trying direct SQL...');

      // Try with a different approach - use SQL Editor API if available
      // For now, let's try to insert data directly to see if table exists
    }

    console.log('✅ Schema creation attempted');

    // Test if the table exists by trying to select from it
    console.log('🔍 Testing table access...');
    const { data: testData, error: testError } = await publicClient.from('airdrops').select('count');

    if (testError) {
      console.log('❌ Table access failed:', testError.message);
      console.log('');
      console.log('📋 Manual setup required:');
      console.log('   1. Go to https://supabase.com/dashboard/project/gphxrmkibuythbcopkmo');
      console.log('   2. Click on "SQL Editor"');
      console.log('   3. Run this SQL:');
      console.log(schemaSQL);
      console.log('   4. Then run: node scripts/init-and-populate.js');
      return;
    }

    console.log('✅ Table access successful');
    console.log(`📊 Current airdrop count: ${testData[0]?.count || 0}`);

    // Comprehensive real airdrop data
    const airdrops = [
      {
        name: 'zkSync Era',
        description: 'Layer 2 scaling solution using ZK-rollups technology with mainnet active and token expected. One of the most anticipated airdrops in 2025.',
        category: 'Layer 2',
        status: 'upcoming',
        blockchain: 'Ethereum',
        token_symbol: 'ZK',
        estimated_value: '$500-2000',
        eligibility_criteria: ['Bridge funds to zkSync Era', 'Use various dApps in the ecosystem', 'Maintain minimum balance of 0.01 ETH', 'Regular interactions over 3+ months'],
        requirements: ['Bridge funds', 'Use dApps', 'Maintain balance'],
        official_website: 'https://zksync.io/',
        twitter_handle: '@zksync',
        discord_link: 'https://discord.gg/zksync',
        featured: true,
        priority: 10,
        potential_rating: 'very_high',
        china_restricted: false
      },
      {
        name: 'StarkNet',
        description: 'ZK-rollup Layer 2 network using STARK proofs with Cairo smart contracts. Already confirmed token distribution.',
        category: 'Layer 2',
        status: 'confirmed',
        blockchain: 'Ethereum',
        token_symbol: 'STRK',
        estimated_value: '$800-2500',
        eligibility_criteria: ['Deploy contracts', 'Use dApps', 'Maintain activity', 'Testnet participation'],
        requirements: ['Testnet participation', 'Mainnet usage', 'Contract deployment'],
        official_website: 'https://starknet.io/',
        twitter_handle: '@starknet',
        discord_link: 'https://discord.gg/starknet',
        featured: true,
        priority: 9,
        potential_rating: 'very_high',
        china_restricted: false
      },
      {
        name: 'Blast',
        description: 'Ethereum L2 with native yield for ETH and stablecoins. Fast-growing ecosystem with big airdrop expectations.',
        category: 'Layer 2',
        status: 'upcoming',
        blockchain: 'Ethereum',
        token_symbol: 'BLAST',
        estimated_value: '$300-1200',
        eligibility_criteria: ['Bridge assets', 'Use dApps', 'Refer friends', 'Maintain activity'],
        requirements: ['Bridge ETH/stablecoins', 'Use Blast dApps', 'Maintain activity'],
        official_website: 'https://blast.io/',
        twitter_handle: '@blast_official',
        discord_link: 'https://discord.gg/blast',
        featured: true,
        priority: 8,
        potential_rating: 'high',
        china_restricted: false
      },
      {
        name: 'EigenLayer',
        description: 'Restaking protocol for Ethereum allowing ETH staking on multiple protocols. Revolutionary restaking concept.',
        category: 'DeFi',
        status: 'upcoming',
        blockchain: 'Ethereum',
        token_symbol: 'EIGEN',
        estimated_value: '$400-1500',
        eligibility_criteria: ['Stake ETH', 'Restake with protocols', 'Maintain position', 'Use AVSs'],
        requirements: ['ETH staking', 'Restake with AVSs', 'Maintain activity'],
        official_website: 'https://www.eigenlayer.xyz/',
        twitter_handle: '@eigenlayer',
        discord_link: 'https://discord.gg/eigenlayer',
        featured: true,
        priority: 9,
        potential_rating: 'very_high',
        china_restricted: false
      },
      {
        name: 'Linea',
        description: 'ConsenSys Layer 2 solution with Type 2 ZK-EVM. Strong institutional backing and growing ecosystem.',
        category: 'Layer 2',
        status: 'upcoming',
        blockchain: 'Ethereum',
        token_symbol: 'LINEA',
        estimated_value: '$300-1500',
        eligibility_criteria: ['Bridge assets via official bridge', 'Use Linea dApps', 'Maintain activity'],
        requirements: ['Bridge assets', 'Use ecosystem dApps'],
        official_website: 'https://linea.build/',
        twitter_handle: '@LineaBuild',
        discord_link: 'https://discord.gg/linea',
        featured: true,
        priority: 8,
        potential_rating: 'high',
        china_restricted: false
      },
      {
        name: 'Arbitrum One',
        description: 'Optimistic rollup Layer 2 scaling solution. Already distributed tokens to eligible users.',
        category: 'Layer 2',
        status: 'distributed',
        blockchain: 'Ethereum',
        token_symbol: 'ARB',
        estimated_value: '$200-800',
        eligibility_criteria: ['Past eligibility', 'Active usage', 'Governance participation'],
        requirements: ['Past usage before snapshot', 'Active trading'],
        official_website: 'https://arbitrum.io/',
        twitter_handle: '@arbitrum',
        discord_link: 'https://discord.gg/arbitrum',
        featured: false,
        priority: 7,
        potential_rating: 'medium',
        china_restricted: false
      },
      {
        name: 'Optimism',
        description: 'Optimistic rollup with EVM compatibility. Multiple airdrop rounds completed.',
        category: 'Layer 2',
        status: 'distributed',
        blockchain: 'Ethereum',
        token_symbol: 'OP',
        estimated_value: '$150-600',
        eligibility_criteria: ['Past governance participation', 'Bridge usage', 'dApp interaction'],
        requirements: ['Governance voting', 'Bridge usage'],
        official_website: 'https://www.optimism.io/',
        twitter_handle: '@optimism',
        discord_link: 'https://discord.gg/optimism',
        featured: false,
        priority: 6,
        potential_rating: 'medium',
        china_restricted: false
      },
      {
        name: 'Uniswap',
        description: 'Leading decentralized exchange. Historical airdrop to early users.',
        category: 'DeFi',
        status: 'distributed',
        blockchain: 'Ethereum',
        token_symbol: 'UNI',
        estimated_value: '$1200-4000',
        eligibility_criteria: ['Historical usage before September 2020'],
        requirements: ['Used Uniswap before snapshot'],
        official_website: 'https://uniswap.org/',
        twitter_handle: '@Uniswap',
        discord_link: 'https://discord.gg/uniswap',
        featured: false,
        priority: 5,
        potential_rating: 'low',
        china_restricted: false
      },
      {
        name: 'Scroll',
        description: 'Native ZK-rollup focused on EVM compatibility and developer experience. Growing ecosystem.',
        category: 'Layer 2',
        status: 'upcoming',
        blockchain: 'Ethereum',
        token_symbol: 'SCR',
        estimated_value: '$200-800',
        eligibility_criteria: ['Testnet participation', 'Mainnet bridge usage', 'dApp interactions'],
        requirements: ['Testnet participation', 'Bridge usage', 'dApp interaction'],
        official_website: 'https://scroll.io/',
        twitter_handle: '@Scroll_ZKP',
        discord_link: 'https://discord.gg/scroll',
        featured: false,
        priority: 7,
        potential_rating: 'high',
        china_restricted: false
      },
      {
        name: 'Base',
        description: 'Coinbase\'s Layer 2 network built on Optimism stack with strong institutional backing.',
        category: 'Layer 2',
        status: 'upcoming',
        blockchain: 'Ethereum',
        token_symbol: 'BASE',
        estimated_value: '$400-1200',
        eligibility_criteria: ['Bridge assets to Base', 'Use Coinbase Wallet and Base dApps', 'Maintain regular transactions'],
        requirements: ['Bridge assets', 'Use Base ecosystem'],
        official_website: 'https://base.org/',
        twitter_handle: '@BuildOnBase',
        discord_link: 'https://discord.gg/base',
        featured: true,
        priority: 8,
        potential_rating: 'high',
        china_restricted: false
      }
    ];

    // Clear existing data first
    console.log('🗑️  Clearing existing data...');
    const { error: clearError } = await adminClient.from('airdrops').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    if (clearError) {
      console.log('⚠️  Warning: Could not clear existing data:', clearError.message);
    } else {
      console.log('✅ Existing data cleared');
    }

    // Insert new data
    console.log(`📊 Inserting ${airdrops.length} airdrops...`);
    let successCount = 0;

    for (const airdrop of airdrops) {
      const { error } = await adminClient.from('airdrops').insert(airdrop);

      if (error) {
        console.log(`❌ Failed to insert "${airdrop.name}":`, error.message);
      } else {
        console.log(`✅ Inserted: ${airdrop.name}`);
        successCount++;
      }
    }

    console.log('');
    console.log('🎉 Database initialization completed!');
    console.log(`   Successfully inserted: ${successCount}/${airdrops.length} airdrops`);
    console.log('');
    console.log('📊 Summary:');
    console.log(`   Upcoming: ${airdrops.filter(a => a.status === 'upcoming').length}`);
    console.log(`   Confirmed: ${airdrops.filter(a => a.status === 'confirmed').length}`);
    console.log(`   Distributed: ${airdrops.filter(a => a.status === 'distributed').length}`);
    console.log(`   Featured: ${airdrops.filter(a => a.featured).length}`);
    console.log('');
    console.log('🚀 Your airdrop hunter is now ready with real data!');

    // Test the final result
    const { data: finalData, error: finalError } = await publicClient.from('airdrops').select('*').limit(5);

    if (finalError) {
      console.log('❌ Final test failed:', finalError.message);
    } else {
      console.log('✅ Final test successful - Sample data:');
      finalData.forEach((item, i) => {
        console.log(`   ${i+1}. ${item.name} (${item.status}) - ${item.estimated_value}`);
      });
    }

  } catch (error) {
    console.error('❌ Error during database initialization:', error.message);

    console.log('');
    console.log('📋 Manual setup may be required:');
    console.log('   1. Go to https://supabase.com/dashboard/project/gphxrmkibuythbcopkmo');
    console.log('   2. Click on "SQL Editor"');
    console.log('   3. Copy and run the SQL from database-setup.sql');
    console.log('   4. Then run: node scripts/init-and-populate.js');
  }
}

initAndPopulateDatabase();