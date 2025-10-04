#!/usr/bin/env node

/**
 * Direct Data Population Script
 * This script uses the Supabase client to populate the database
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function populateData() {
  console.log('🌱 Populating Airdrop Database with Real Data');
  console.log('=============================================');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Supabase credentials not found');
    process.exit(1);
  }

  console.log('🔗 Connecting to Supabase...');
  console.log('   URL:', supabaseUrl);

  const supabase = createClient(supabaseUrl, supabaseKey);

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
      telegram_link: null,
      contract_address: null,
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
      telegram_link: null,
      contract_address: null,
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
      telegram_link: null,
      contract_address: null,
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
      telegram_link: null,
      contract_address: null,
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
      telegram_link: null,
      contract_address: null,
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
      telegram_link: null,
      contract_address: null,
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
      telegram_link: null,
      contract_address: null,
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
      telegram_link: null,
      contract_address: null,
      featured: false,
      priority: 5,
      potential_rating: 'low',
      china_restricted: false
    },
    {
      name: 'dYdX',
      description: 'Leading decentralized derivatives trading platform. Multiple airdrop rounds.',
      category: 'DeFi',
      status: 'distributed',
      blockchain: 'Ethereum',
      token_symbol: 'DYDX',
      estimated_value: '$800-3000',
      eligibility_criteria: ['Trading volume', 'Governance participation'],
      requirements: ['Trading activity before snapshot'],
      official_website: 'https://dydx.exchange/',
      twitter_handle: '@dydxprotocol',
      discord_link: 'https://discord.gg/dydx',
      telegram_link: null,
      contract_address: null,
      featured: false,
      priority: 6,
      potential_rating: 'medium',
      china_restricted: false
    },
    {
      name: '1inch',
      description: 'Leading DEX aggregator. Airdropped to early users and liquidity providers.',
      category: 'DeFi',
      status: 'distributed',
      blockchain: 'Ethereum',
      token_symbol: '1INCH',
      estimated_value: '$500-1500',
      eligibility_criteria: ['Usage before December 2020', 'Governance participation'],
      requirements: ['Used 1inch before snapshot'],
      official_website: 'https://1inch.io/',
      twitter_handle: '@1inch',
      discord_link: 'https://discord.gg/1inch',
      telegram_link: null,
      contract_address: null,
      featured: false,
      priority: 5,
      potential_rating: 'medium',
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
      telegram_link: null,
      contract_address: null,
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
      telegram_link: null,
      contract_address: null,
      featured: true,
      priority: 8,
      potential_rating: 'high',
      china_restricted: false
    }
  ];

  try {
    // Test connection first
    console.log('🔍 Testing database connection...');
    const { data: existingData, error: testError } = await supabase.from('airdrops').select('count');

    if (testError) {
      console.log('❌ Database connection failed:', testError.message);
      console.log('');
      console.log('📋 The airdrops table might not exist yet.');
      console.log('📝 Please run the SQL from database-setup.sql in your Supabase dashboard:');
      console.log('   1. Go to https://supabase.com/dashboard/project/gphxrmkibuythbcopkmo');
      console.log('   2. Click on "SQL Editor"');
      console.log('   3. Copy and paste the contents of database-setup.sql');
      console.log('   4. Click "Run" to create the schema');
      console.log('   5. Run this script again: node scripts/populate-data.js');
      process.exit(1);
    }

    console.log('✅ Database connection successful');
    console.log(`📊 Current airdrop count: ${existingData[0]?.count || 0}`);

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    const { error: clearError } = await supabase.from('airdrops').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (clearError) {
      console.log('⚠️  Warning: Could not clear existing data:', clearError.message);
    } else {
      console.log('✅ Existing data cleared');
    }

    // Insert airdrops
    console.log(`📊 Inserting ${airdrops.length} airdrops...`);
    let successCount = 0;

    for (const airdrop of airdrops) {
      const { error } = await supabase.from('airdrops').insert(airdrop);

      if (error) {
        console.log(`❌ Failed to insert "${airdrop.name}":`, error.message);
      } else {
        console.log(`✅ Inserted: ${airdrop.name}`);
        successCount++;
      }
    }

    console.log('');
    console.log('🎉 Database population completed!');
    console.log(`   Successfully inserted: ${successCount}/${airdrops.length} airdrops`);
    console.log('');
    console.log('📊 Summary:');
    console.log(`   Upcoming: ${airdrops.filter(a => a.status === 'upcoming').length}`);
    console.log(`   Confirmed: ${airdrops.filter(a => a.status === 'confirmed').length}`);
    console.log(`   Distributed: ${airdrops.filter(a => a.status === 'distributed').length}`);
    console.log(`   Featured: ${airdrops.filter(a => a.featured).length}`);
    console.log('');
    console.log('🚀 Your airdrop hunter is now ready with real data!');

  } catch (error) {
    console.error('❌ Error populating database:', error.message);
    process.exit(1);
  }
}

populateData();