#!/usr/bin/env node

/**
 * Neon Database Setup Script
 * This script will create the schema and populate the Neon database with real airdrop data
 */

const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function setupNeonDatabase() {
  console.log('🚀 Neon Database Setup');
  console.log('========================');

  const dbUrl = process.env.NEON_DB_URL;

  if (!dbUrl) {
    console.log('❌ NEON_DB_URL not found in environment variables');
    process.exit(1);
  }

  console.log('🔗 Connecting to Neon database...');
  console.log('   Database: neondb');

  const client = new Client({
    connectionString: dbUrl
  });

  try {
    await client.connect();
    console.log('✅ Connected to Neon database successfully');

    // Create the airdrops table
    console.log('📊 Creating airdrops table...');
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
    `;

    await client.query(createTableSQL);
    console.log('✅ Airdrops table created successfully');

    // Create indexes for better performance
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
    console.log('✅ Indexes created successfully');

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
    console.log('✅ Trigger created successfully');

    console.log('');
    console.log('🎉 Database schema created successfully!');
    console.log('');
    console.log('📊 Inserting real airdrop data...');

    // Clear existing data
    await client.query('DELETE FROM airdrops WHERE TRUE;');
    console.log('✅ Cleared existing data');

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
      },
      {
        name: 'Sei Network',
        description: 'Sector-specific Layer 1 focused on trading and DeFi applications with high performance.',
        category: 'Layer 1',
        status: 'upcoming',
        blockchain: 'Sei',
        token_symbol: 'SEI',
        estimated_value: '$150-600',
        eligibility_criteria: ['Testnet participation', 'Mainnet trading activity', 'Staking participation'],
        requirements: ['Testnet usage', 'Trading activity', 'Staking'],
        official_website: 'https://www.sei.io/',
        twitter_handle: '@SeiNetwork',
        discord_link: 'https://discord.gg/sei',
        featured: false,
        priority: 6,
        potential_rating: 'medium',
        china_restricted: false
      },
      {
        name: 'Polygon zkEVM',
        description: 'ZK-rollup compatible with Ethereum using Polygon technology.',
        category: 'Layer 2',
        status: 'upcoming',
        blockchain: 'Ethereum',
        token_symbol: 'POL',
        estimated_value: '$200-800',
        eligibility_criteria: ['Bridge assets', 'Use dApps', 'Maintain activity'],
        requirements: ['Bridge to zkEVM', 'Use ecosystem dApps'],
        official_website: 'https://polygon.technology/polygon-zkevm',
        twitter_handle: '@0xPolygon',
        discord_link: 'https://discord.gg/polygon',
        featured: false,
        priority: 7,
        potential_rating: 'high',
        china_restricted: false
      }
    ];

    // Insert all airdrops
    let successCount = 0;
    for (const airdrop of airdrops) {
      const insertSQL = `
        INSERT INTO airdrops (name, description, category, status, blockchain, token_symbol, estimated_value, eligibility_criteria, requirements, official_website, twitter_handle, discord_link, featured, priority, potential_rating, china_restricted)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING id;
      `;

      const values = [
        airdrop.name,
        airdrop.description,
        airdrop.category,
        airdrop.status,
        airdrop.blockchain,
        airdrop.token_symbol,
        airdrop.estimated_value,
        airdrop.eligibility_criteria,
        airdrop.requirements,
        airdrop.official_website,
        airdrop.twitter_handle,
        airdrop.discord_link,
        airdrop.featured,
        airdrop.priority,
        airdrop.potential_rating,
        airdrop.china_restricted
      ];

      try {
        const result = await client.query(insertSQL, values);
        console.log(`✅ Inserted: ${airdrop.name}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Failed to insert "${airdrop.name}":`, error.message);
      }
    }

    console.log('');
    console.log('🎉 Database setup completed!');
    console.log(`   Successfully inserted: ${successCount}/${airdrops.length} airdrops`);
    console.log('');
    console.log('📊 Summary:');
    console.log(`   Upcoming: ${airdrops.filter(a => a.status === 'upcoming').length}`);
    console.log(`   Confirmed: ${airdrops.filter(a => a.status === 'confirmed').length}`);
    console.log(`   Distributed: ${airdrops.filter(a => a.status === 'distributed').length}`);
    console.log(`   Featured: ${airdrops.filter(a => a.featured).length}`);
    console.log('');

    // Test the database
    console.log('🔍 Testing database...');
    const { rows } = await client.query('SELECT COUNT(*) as count FROM airdrops');
    console.log(`✅ Total airdrops in database: ${rows[0].count}`);

    const featuredAirdrops = await client.query('SELECT name, status, estimated_value FROM airdrops WHERE featured = true ORDER BY priority DESC LIMIT 3');
    console.log('✅ Featured airdrops:');
    featuredAirdrops.rows.forEach((item, i) => {
      console.log(`   ${i+1}. ${item.name} (${item.status}) - ${item.estimated_value}`);
    });

    console.log('');
    console.log('🚀 Your Neon database is ready with real airdrop data!');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupNeonDatabase();