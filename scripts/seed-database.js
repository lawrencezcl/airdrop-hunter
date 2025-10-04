#!/usr/bin/env node

/**
 * Database Seeding Script
 * This script will populate the database with comprehensive airdrop data
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function seedDatabase() {
  console.log('🌱 Seeding Airdrop Hunter Database');
  console.log('===================================');

  // Check for real Supabase credentials
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseKey.includes('placeholder')) {
    console.log('❌ Please update your .env.local with real Supabase credentials');
    console.log('   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co');
    console.log('   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here');
    console.log('');
    console.log('After updating credentials, run: npm run seed');
    process.exit(1);
  }

  console.log('🔗 Connecting to Supabase...');
  console.log('   URL:', supabaseUrl);

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Test connection
    const { error: testError } = await supabase.from('airdrops').select('count');
    if (testError) {
      console.log('❌ Database connection failed:', testError.message);
      process.exit(1);
    }
    console.log('✅ Database connection successful');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    const { error: clearError } = await supabase.from('airdrops').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (clearError) {
      console.log('⚠️  Warning: Could not clear existing data:', clearError.message);
    } else {
      console.log('✅ Existing data cleared');
    }

    // Comprehensive airdrop data
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
      }
    ];

    console.log(`📊 Inserting ${airdrops.length} airdrops...`);

    // Insert airdrops
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
    console.log('🎉 Database seeding completed!');
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
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();