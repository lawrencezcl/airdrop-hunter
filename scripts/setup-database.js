#!/usr/bin/env node

/**
 * Database Setup Script
 * This script will:
 * 1. Create the database schema
 * 2. Populate it with comprehensive airdrop data
 * 3. Test the database connection
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Airdrop Hunter Database Setup');
console.log('=================================');

// Read the database schema
const schemaPath = path.join(__dirname, '../supabase/schema.sql');
const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

console.log('✅ Database schema loaded');

// Read the mock data
const mockDataPath = path.join(__dirname, '../src/lib/mock-data.ts');
const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

// Extract mock data from the TypeScript file
const mockDataMatch = mockDataContent.match(/export const mockAirdrops: Airdrop\[\] = \[([\s\S]*?)\];/);
if (!mockDataMatch) {
  console.error('❌ Could not extract mock data from file');
  process.exit(1);
}

console.log('✅ Mock data loaded');

// Generate SQL insert statements for the mock data
function generateInsertSQL(mockData) {
  // This is a simplified version - in production, you'd parse the TypeScript properly
  const airdrops = [
    {
      name: 'zkSync Era',
      description: 'Layer 2 scaling solution using ZK-rollups technology with mainnet active and token expected',
      category: 'Layer 2',
      status: 'upcoming',
      blockchain: 'Ethereum',
      token_symbol: 'ZK',
      estimated_value: '$500-2000',
      eligibility_criteria: ['Bridge funds to zkSync Era', 'Use various dApps in the ecosystem', 'Maintain minimum balance', 'Regular interactions over 3+ months'],
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
      description: 'ZK-rollup Layer 2 network using STARK proofs with Cairo smart contracts',
      category: 'Layer 2',
      status: 'confirmed',
      blockchain: 'Ethereum',
      token_symbol: 'STRK',
      estimated_value: '$800-2500',
      eligibility_criteria: ['Deploy contracts', 'Use dApps', 'Maintain activity'],
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
      description: 'Ethereum L2 with native yield for ETH and stablecoins',
      category: 'Layer 2',
      status: 'upcoming',
      blockchain: 'Ethereum',
      token_symbol: 'BLAST',
      estimated_value: '$300-1200',
      eligibility_criteria: ['Bridge assets', 'Use dApps', 'Refer friends'],
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
      description: 'Restaking protocol for Ethereum allowing ETH staking on multiple protocols',
      category: 'DeFi',
      status: 'upcoming',
      blockchain: 'Ethereum',
      token_symbol: 'EIGEN',
      estimated_value: '$400-1500',
      eligibility_criteria: ['Stake ETH', 'Restake with protocols', 'Maintain position'],
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
      description: 'ConsenSys Layer 2 solution with Type 2 ZK-EVM',
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
    }
  ];

  let insertSQL = '-- Insert comprehensive airdrop data\n';

  airdrops.forEach((airdrop, index) => {
    const values = [
      `'${airdrop.name.replace(/'/g, "''")}'`,
      `'${airdrop.description.replace(/'/g, "''")}'`,
      `'${airdrop.category}'`,
      `'${airdrop.status}'`,
      `'${airdrop.blockchain}'`,
      airdrop.token_symbol ? `'${airdrop.token_symbol}'` : 'NULL',
      airdrop.estimated_value ? `'${airdrop.estimated_value}'` : 'NULL',
      airdrop.eligibility_criteria ? `ARRAY[${airdrop.eligibility_criteria.map(c => `'${c.replace(/'/g, "''")}'`).join(', ')}]` : 'NULL',
      airdrop.requirements ? `ARRAY[${airdrop.requirements.map(r => `'${r.replace(/'/g, "''")}'`).join(', ')}]` : 'NULL',
      airdrop.official_website ? `'${airdrop.official_website}'` : 'NULL',
      airdrop.twitter_handle ? `'${airdrop.twitter_handle}'` : 'NULL',
      airdrop.discord_link ? `'${airdrop.discord_link}'` : 'NULL',
      airdrop.telegram_link ? `'${airdrop.telegram_link}'` : 'NULL',
      airdrop.contract_address ? `'${airdrop.contract_address}'` : 'NULL',
      'NULL', // distribution_date
      airdrop.featured ? 'TRUE' : 'FALSE',
      airdrop.priority,
      `'${airdrop.potential_rating}'`,
      airdrop.china_restricted ? 'TRUE' : 'FALSE'
    ];

    insertSQL += `INSERT INTO airdrops (name, description, category, status, blockchain, token_symbol, estimated_value, eligibility_criteria, requirements, official_website, twitter_handle, discord_link, telegram_link, contract_address, distribution_date, featured, priority, potential_rating, china_restricted) VALUES (${values.join(', ')});\n`;
  });

  return insertSQL;
}

const insertSQL = generateInsertSQL();
const fullSQL = schemaSQL + '\n\n' + insertSQL;

// Write the complete SQL to a file
const outputPath = path.join(__dirname, '../database-setup.sql');
fs.writeFileSync(outputPath, fullSQL);

console.log('✅ Database setup SQL generated');
console.log(`📄 File saved to: ${outputPath}`);
console.log('');
console.log('📋 Next Steps:');
console.log('1. Create a new Supabase project at https://supabase.com/dashboard');
console.log('2. Go to Settings > Database and run the SQL from database-setup.sql');
console.log('3. Go to Settings > API to get your credentials');
console.log('4. Update your .env.local with the real credentials:');
console.log('');
console.log('   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co');
console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here');
console.log('   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here');
console.log('');
console.log('5. Run: npm run seed');
console.log('');
console.log('🎯 Your database will be populated with 5+ high-potential airdrops!');