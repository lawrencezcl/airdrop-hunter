import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface AirdropData {
  name: string;
  description: string;
  category: 'Layer 2' | 'DeFi' | 'Gaming' | 'Infrastructure' | 'Social' | 'Other';
  status: 'upcoming' | 'confirmed' | 'distributed' | 'ended';
  blockchain: string;
  token_symbol?: string;
  estimated_value?: string;
  eligibility_criteria?: string[];
  requirements?: string[];
  official_website?: string;
  twitter_handle?: string;
  discord_link?: string;
  telegram_link?: string;
  contract_address?: string;
  distribution_date?: string;
  featured: boolean;
  priority: number;
  potential_rating: 'low' | 'medium' | 'high' | 'very_high';
  china_restricted: boolean;
}

// Comprehensive airdrop data from research
const airdropsData: AirdropData[] = [
  // Upcoming High-Potential Airdrops (2025)
  {
    name: 'zkSync Era',
    description: 'Layer 2 scaling solution using ZK-rollups technology with mainnet active and token expected',
    category: 'Layer 2',
    status: 'upcoming',
    blockchain: 'Ethereum',
    token_symbol: 'ZK',
    estimated_value: '$500-2,000',
    eligibility_criteria: ['Early users', 'DeFi participants', 'NFT minters'],
    requirements: ['Bridge assets to zkSync', 'Use dApps on zkSync', 'Maintain regular activity'],
    official_website: 'https://zksync.io/',
    twitter_handle: '@zksync',
    discord_link: 'https://discord.gg/zksync',
    priority: 10,
    potential_rating: 'very_high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'StarkNet',
    description: 'ZK-rollup Layer 2 solution focused on scalability and developer experience',
    category: 'Layer 2',
    status: 'upcoming',
    blockchain: 'Ethereum',
    token_symbol: 'STRK',
    estimated_value: '$500-2,000',
    eligibility_criteria: ['Active developers', 'Power users', 'dApp users'],
    requirements: ['Use StarkNet dApps', 'Deploy contracts', 'Maintain activity'],
    official_website: 'https://starknet.io/',
    twitter_handle: '@StarkNet',
    priority: 9,
    potential_rating: 'very_high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'Linea',
    description: 'Consensys-backed Layer 2 solution focused on Ethereum compatibility',
    category: 'Layer 2',
    status: 'upcoming',
    blockchain: 'Ethereum',
    estimated_value: '$300-1,500',
    eligibility_criteria: ['Testnet users', 'Early mainnet users', 'dApp participants'],
    requirements: ['Bridge ETH to Linea', 'Use Linea dApps', 'Maintain activity'],
    official_website: 'https://linea.build/',
    twitter_handle: '@LineaBuild',
    priority: 8,
    potential_rating: 'high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'Blast',
    description: 'Layer 2 solution with native yield for ETH and stablecoins',
    category: 'Layer 2',
    status: 'upcoming',
    blockchain: 'Ethereum',
    estimated_value: '$500-2,000',
    eligibility_criteria: ['Early users', 'DeFi participants'],
    requirements: ['Bridge assets to Blast', 'Use native yield features', 'Maintain activity'],
    official_website: 'https://blast.io/',
    twitter_handle: '@Blast_L2',
    priority: 9,
    potential_rating: 'very_high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'EigenLayer',
    description: 'Ethereum restaking protocol enabling shared security',
    category: 'Infrastructure',
    status: 'upcoming',
    blockchain: 'Ethereum',
    token_symbol: 'EIGEN',
    estimated_value: '$500-3,000',
    eligibility_criteria: ['ETH stakers', 'Restakers', 'Node operators'],
    requirements: ['Restake ETH through EigenLayer', 'Operate nodes', 'Maintain activity'],
    official_website: 'https://www.eigenlayer.xyz/',
    twitter_handle: '@EigenLayer',
    priority: 10,
    potential_rating: 'very_high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'Uniswap V4',
    description: 'Next version of Uniswap with hooks functionality',
    category: 'DeFi',
    status: 'upcoming',
    blockchain: 'Ethereum',
    estimated_value: '$1,000-5,000',
    eligibility_criteria: ['Hook developers', 'Early LPs', 'Active traders'],
    requirements: ['Develop hooks', 'Provide liquidity', 'Test new features'],
    official_website: 'https://uniswap.org/',
    twitter_handle: '@Uniswap',
    priority: 9,
    potential_rating: 'high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'ParaSwap',
    description: 'Decentralized exchange aggregator with potential token launch',
    category: 'DeFi',
    status: 'upcoming',
    blockchain: 'Multi-chain',
    estimated_value: '$200-1,000',
    eligibility_criteria: ['Active traders', 'Liquidity providers'],
    requirements: ['Use ParaSwap for swaps', 'Provide liquidity', 'Maintain volume'],
    official_website: 'https://paraswap.io/',
    twitter_handle: '@ParaSwap',
    priority: 7,
    potential_rating: 'medium',
    featured: false,
    china_restricted: false
  },
  {
    name: 'Farcaster',
    description: 'Decentralized social network protocol with potential token',
    category: 'Social',
    status: 'upcoming',
    blockchain: 'Ethereum',
    estimated_value: '$300-1,500',
    eligibility_criteria: ['Active users', 'Content creators', 'Early adopters'],
    requirements: ['Regular posting', 'Engagement', 'Build social presence'],
    official_website: 'https://www.farcaster.xyz/',
    twitter_handle: '@farcaster',
    priority: 8,
    potential_rating: 'high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'Lens Protocol',
    description: 'Decentralized social graph protocol',
    category: 'Social',
    status: 'upcoming',
    blockchain: 'Polygon',
    estimated_value: '$200-1,000',
    eligibility_criteria: ['Content creators', 'Active users', 'Profile owners'],
    requirements: ['Create Lens profile', 'Publish content', 'Engage with others'],
    official_website: 'https://www.lens.xyz/',
    twitter_handle: '@LensProtocol',
    priority: 7,
    potential_rating: 'medium',
    featured: false,
    china_restricted: false
  },
  {
    name: 'Pixelmon',
    description: 'Web3 gaming project with NFT integration',
    category: 'Gaming',
    status: 'upcoming',
    blockchain: 'Ethereum',
    estimated_value: '$100-500',
    eligibility_criteria: ['NFT holders', 'Game participants', 'Community members'],
    requirements: ['Hold Pixelmon NFTs', 'Participate in games', 'Community engagement'],
    official_website: 'https://pixelmon.xyz/',
    twitter_handle: '@pixelmon',
    priority: 6,
    potential_rating: 'medium',
    featured: false,
    china_restricted: false
  },
  {
    name: 'Illuvium',
    description: 'Open-world RPG blockchain game',
    category: 'Gaming',
    status: 'upcoming',
    blockchain: 'Immutable X',
    estimated_value: '$200-1,000',
    eligibility_criteria: ['Active players', 'Landowners', 'Beta testers'],
    requirements: ['Play the game', 'Own land', 'Participate in beta'],
    official_website: 'https://illuvium.io/',
    twitter_handle: '@illuviumio',
    priority: 7,
    potential_rating: 'medium',
    featured: false,
    china_restricted: false
  },

  // Completed Airdrops (Case Studies)
  {
    name: 'Uniswap',
    description: 'Leading decentralized exchange protocol',
    category: 'DeFi',
    status: 'distributed',
    blockchain: 'Ethereum',
    token_symbol: 'UNI',
    estimated_value: '$1,500 at launch',
    eligibility_criteria: ['Historical users', 'Liquidity providers', 'Traders'],
    requirements: ['Swapped tokens', 'Provided liquidity', 'Voted in governance'],
    distribution_date: '2020-09-17',
    official_website: 'https://uniswap.org/',
    twitter_handle: '@Uniswap',
    priority: 10,
    potential_rating: 'very_high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'dYdX',
    description: 'Decentralized perpetual trading platform',
    category: 'DeFi',
    status: 'distributed',
    blockchain: 'Ethereum',
    token_symbol: 'DYDX',
    estimated_value: '$1,200-3,000',
    eligibility_criteria: ['Traders', 'Active users'],
    requirements: ['Trading volume', 'Platform activity', 'Historical usage'],
    distribution_date: '2021-08-03',
    official_website: 'https://dydx.exchange/',
    twitter_handle: '@dydxprotocol',
    priority: 9,
    potential_rating: 'high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'Arbitrum',
    description: 'Leading Layer 2 optimistic rollup solution',
    category: 'Layer 2',
    status: 'distributed',
    blockchain: 'Ethereum',
    token_symbol: 'ARB',
    estimated_value: '$1,250',
    eligibility_criteria: ['DAO voters', 'Bridge users', 'dApp users'],
    requirements: ['Bridged assets', 'Used dApps', 'Voted in governance'],
    distribution_date: '2023-03-23',
    official_website: 'https://arbitrum.io/',
    twitter_handle: '@arbitrum',
    priority: 10,
    potential_rating: 'very_high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'Optimism',
    description: 'Layer 2 scaling solution for Ethereum',
    category: 'Layer 2',
    status: 'distributed',
    blockchain: 'Ethereum',
    token_symbol: 'OP',
    estimated_value: '$700-1,000',
    eligibility_criteria: ['Early users', 'DAO voters', 'Ecosystem contributors'],
    requirements: ['Used Optimism', 'Governance participation', 'Ecosystem activity'],
    distribution_date: '2022-05-31',
    official_website: 'https://www.optimism.io/',
    twitter_handle: '@optimismPBC',
    priority: 9,
    potential_rating: 'high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'Aptos',
    description: 'Layer 1 blockchain focused on scalability and safety',
    category: 'Infrastructure',
    status: 'distributed',
    blockchain: 'Aptos',
    token_symbol: 'APT',
    estimated_value: '$300-500',
    eligibility_criteria: ['Testnet participants', 'Early mainnet users'],
    requirements: ['Testnet participation', 'Early adoption', 'Community engagement'],
    distribution_date: '2022-10-18',
    official_website: 'https://aptoslabs.com/',
    twitter_handle: '@Aptos_Network',
    priority: 8,
    potential_rating: 'high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'Blur',
    description: 'NFT marketplace and aggregator',
    category: 'DeFi',
    status: 'distributed',
    blockchain: 'Ethereum',
    token_symbol: 'BLUR',
    estimated_value: 'Variable based on trading volume',
    eligibility_criteria: ['NFT traders', 'Liquidity providers'],
    requirements: ['NFT trading volume', 'Platform usage'],
    distribution_date: '2023-02-14',
    official_website: 'https://www.blur.io/',
    twitter_handle: '@blur_io',
    priority: 8,
    potential_rating: 'high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'Celestia',
    description: 'Modular data availability network',
    category: 'Infrastructure',
    status: 'distributed',
    blockchain: 'Celestia',
    token_symbol: 'TIA',
    estimated_value: '$50-200',
    eligibility_criteria: ['Testnet users', 'Community members'],
    requirements: ['Testnet participation', 'Community contributions'],
    distribution_date: '2023-10-31',
    official_website: 'https://celestia.org/',
    twitter_handle: '@CelestiaOrg',
    priority: 8,
    potential_rating: 'high',
    featured: true,
    china_restricted: false
  },
  {
    name: 'Sei',
    description: 'Layer 1 blockchain focused on DeFi and gaming',
    category: 'Infrastructure',
    status: 'distributed',
    blockchain: 'Sei',
    token_symbol: 'SEI',
    estimated_value: '$200-500',
    eligibility_criteria: ['Testnet participants', 'Community members'],
    requirements: ['Testnet usage', 'Community engagement'],
    distribution_date: '2023-08-15',
    official_website: 'https://www.seinetwork.io/',
    twitter_handle: '@seinetwork',
    priority: 7,
    potential_rating: 'medium',
    featured: false,
    china_restricted: false
  },
  {
    name: 'LayerZero',
    description: 'Omnichain interoperability protocol',
    category: 'Infrastructure',
    status: 'distributed',
    blockchain: 'Multi-chain',
    token_symbol: 'ZRO',
    estimated_value: '$500-2,000',
    eligibility_criteria: ['Power users', 'Developers', 'Cross-chain activity'],
    requirements: ['Cross-chain transactions', 'Bridge usage', 'dApp integration'],
    distribution_date: '2024-06-20',
    official_website: 'https://layerzero.network/',
    twitter_handle: '@LayerZero_Labs',
    priority: 9,
    potential_rating: 'high',
    featured: true,
    china_restricted: false
  }
];

async function seedDatabase() {
  console.log('Starting database seeding...');

  try {
    // Insert airdrops
    for (const airdropData of airdropsData) {
      const { data, error } = await supabase
        .from('airdrops')
        .upsert({
          name: airdropData.name,
          description: airdropData.description,
          category: airdropData.category,
          status: airdropData.status,
          blockchain: airdropData.blockchain,
          token_symbol: airdropData.token_symbol,
          estimated_value: airdropData.estimated_value,
          eligibility_criteria: airdropData.eligibility_criteria,
          requirements: airdropData.requirements,
          official_website: airdropData.official_website,
          twitter_handle: airdropData.twitter_handle,
          discord_link: airdropData.discord_link,
          telegram_link: airdropData.telegram_link,
          contract_address: airdropData.contract_address,
          distribution_date: airdropData.distribution_date,
          featured: airdropData.featured,
          priority: airdropData.priority,
          potential_rating: airdropData.potential_rating,
          china_restricted: airdropData.china_restricted
        }, {
          onConflict: 'name'
        })
        .select();

      if (error) {
        console.error(`Error inserting ${airdropData.name}:`, error);
      } else {
        console.log(`✓ Inserted/Updated: ${airdropData.name}`);
      }
    }

    console.log('Database seeding completed successfully!');
    console.log(`Total airdrops processed: ${airdropsData.length}`);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();