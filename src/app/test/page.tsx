'use client'

import { useState, useEffect } from 'react'
import { supabase, Airdrop } from '@/lib/supabase'

// Mock data for testing
const mockAirdrops: Airdrop[] = [
  {
    id: '1',
    name: 'zkSync Era',
    description: 'Layer 2 scaling solution for Ethereum with zk-rollup technology. Potential airdrop for early users and testers.',
    category: 'Layer 2',
    status: 'upcoming',
    blockchain: 'Ethereum',
    token_symbol: 'ZK',
    estimated_value: '$500-2000',
    eligibility_criteria: ['Bridge assets', 'Use dApps', 'Maintain activity'],
    requirements: ['Bridge ETH to zkSync', 'Make transactions', 'Use DeFi protocols'],
    official_website: 'https://zksync.io',
    twitter_handle: 'zksync',
    discord_link: 'https://discord.gg/zksync',
    telegram_link: 'https://t.me/zksync',
    contract_address: '',
    distribution_date: new Date('2025-03-01').toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    featured: true,
    priority: 9,
    potential_rating: 'very_high',
    china_restricted: false
  },
  {
    id: '2',
    name: 'Linea',
    description: 'Consensus Layer 2 solution by ConsenSys offering EVM compatibility and high throughput.',
    category: 'Layer 2',
    status: 'upcoming',
    blockchain: 'Ethereum',
    token_symbol: 'LINEA',
    estimated_value: '$300-1500',
    eligibility_criteria: ['Early adopters', 'DeFi users', 'Bridge activity'],
    requirements: ['Bridge to Linea', 'Use Linea dApps', 'Maintain regular activity'],
    official_website: 'https://linea.build',
    twitter_handle: 'LineaBuild',
    discord_link: 'https://discord.gg/linea',
    telegram_link: 'https://t.me/lineabuild',
    contract_address: '',
    distribution_date: new Date('2025-02-15').toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    featured: true,
    priority: 8,
    potential_rating: 'high',
    china_restricted: false
  },
  {
    id: '3',
    name: 'StarkNet',
    description: 'ZK-rollup Layer 2 network enabling decentralized applications with STARK proof system.',
    category: 'Layer 2',
    status: 'confirmed',
    blockchain: 'Ethereum',
    token_symbol: 'STRK',
    estimated_value: '$700-3000',
    eligibility_criteria: ['Developer activity', 'Power users', 'Community contributors'],
    requirements: ['Deploy smart contracts', 'High transaction volume', 'Governance participation'],
    official_website: 'https://starknet.io',
    twitter_handle: 'starknet',
    discord_link: 'https://discord.gg/starknet',
    telegram_link: 'https://t.me/starknet',
    contract_address: '',
    distribution_date: new Date('2024-12-15').toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    featured: true,
    priority: 10,
    potential_rating: 'very_high',
    china_restricted: true
  },
  {
    id: '4',
    name: 'Arbitrum One',
    description: 'Leading Optimistic Rollup Layer 2 solution offering low fees and fast transactions.',
    category: 'Layer 2',
    status: 'distributed',
    blockchain: 'Ethereum',
    token_symbol: 'ARB',
    estimated_value: '$1200',
    eligibility_criteria: ['Early users', 'DAO voters', 'Bridge users'],
    requirements: ['Used Arbitrum before snapshot', 'Bridged assets', 'Voted on proposals'],
    official_website: 'https://arbitrum.io',
    twitter_handle: 'arbitrum',
    discord_link: 'https://discord.gg/arbitrum',
    telegram_link: 'https://t.me/arbitrum',
    contract_address: '',
    distribution_date: new Date('2023-03-23').toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    featured: false,
    priority: 6,
    potential_rating: 'medium',
    china_restricted: false
  },
  {
    id: '5',
    name: 'Uniswap V4',
    description: 'Latest version of the largest decentralized exchange with hooks for custom functionality.',
    category: 'DeFi',
    status: 'upcoming',
    blockchain: 'Ethereum',
    token_symbol: 'UNI',
    estimated_value: '$Potential governance rewards',
    eligibility_criteria: ['Liquidity providers', 'Hook developers', 'Active traders'],
    requirements: ['Provide liquidity', 'Develop hooks', 'High trading volume'],
    official_website: 'https://uniswap.org',
    twitter_handle: 'uniswap',
    discord_link: 'https://discord.gg/uniswap',
    telegram_link: 'https://t.me/uniswap',
    contract_address: '',
    distribution_date: new Date('2025-06-01').toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    featured: false,
    priority: 7,
    potential_rating: 'high',
    china_restricted: false
  },
  {
    id: '6',
    name: 'Pixelmon',
    description: 'Evolutionary NFT and gaming project with play-to-earn mechanics and metaverse integration.',
    category: 'Gaming',
    status: 'upcoming',
    blockchain: 'Ethereum',
    token_symbol: 'MON',
    estimated_value: '$200-800',
    eligibility_criteria: ['NFT holders', 'Game players', 'Community members'],
    requirements: ['Hold Pixelmon NFTs', 'Play the game', 'Participate in events'],
    official_website: 'https://pixelmon.xyz',
    twitter_handle: 'pixelmon',
    discord_link: 'https://discord.gg/pixelmon',
    telegram_link: 'https://t.me/pixelmon',
    contract_address: '',
    distribution_date: new Date('2025-04-01').toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    featured: false,
    priority: 5,
    potential_rating: 'medium',
    china_restricted: true
  }
]

export default function TestPage() {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setAirdrops(mockAirdrops)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Airdrop Hunter - Test Page</h1>
          <p className="text-gray-600 mt-1">UI/UX Testing with Mock Data</p>
        </div>
      </header>

      {/* Test Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">UI Components Test</h2>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-600 text-white rounded-lg p-4">
              <div className="text-2xl font-bold">6</div>
              <div className="text-blue-100">Test Airdrops</div>
            </div>
            <div className="bg-green-600 text-white rounded-lg p-4">
              <div className="text-2xl font-bold">3</div>
              <div className="text-green-100">Featured</div>
            </div>
            <div className="bg-purple-600 text-white rounded-lg p-4">
              <div className="text-2xl font-bold">2</div>
              <div className="text-purple-100">Categories</div>
            </div>
            <div className="bg-orange-600 text-white rounded-lg p-4">
              <div className="text-2xl font-bold">1</div>
              <div className="text-orange-100">China Restricted</div>
            </div>
          </div>
        </div>

        {/* Airdrops Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Airdrop Cards Display</h2>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {airdrops.map((airdrop) => (
                <div key={airdrop.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{airdrop.name}</h3>
                        {airdrop.featured && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            ⭐ Featured
                          </div>
                        )}
                        {airdrop.china_restricted && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            ⚠️ CN Restricted
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          🌐 {airdrop.blockchain}
                        </span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{airdrop.category}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          airdrop.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                          airdrop.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          airdrop.status === 'distributed' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {airdrop.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        airdrop.potential_rating === 'very_high' ? 'text-purple-600 bg-purple-100' :
                        airdrop.potential_rating === 'high' ? 'text-green-600 bg-green-100' :
                        airdrop.potential_rating === 'medium' ? 'text-yellow-600 bg-yellow-100' :
                        'text-gray-600 bg-gray-100'
                      }`}>
                        {airdrop.potential_rating?.replace('_', ' ').toUpperCase()} POTENTIAL
                      </div>
                      <div className="text-xs text-gray-500">
                        Priority: {airdrop.priority}/10
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {airdrop.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{airdrop.description}</p>
                  )}

                  {/* Key Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {airdrop.token_symbol && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">Token Symbol</div>
                        <div className="font-semibold text-gray-900">{airdrop.token_symbol}</div>
                      </div>
                    )}

                    {airdrop.estimated_value && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">Est. Value</div>
                        <div className="font-semibold text-gray-900">{airdrop.estimated_value}</div>
                      </div>
                    )}
                  </div>

                  {/* Requirements Preview */}
                  {airdrop.requirements && airdrop.requirements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {airdrop.requirements.slice(0, 2).map((req, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                            {req}
                          </span>
                        ))}
                        {airdrop.requirements.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                            +{airdrop.requirements.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {airdrop.official_website && (
                        <a
                          href={airdrop.official_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          🌐 Visit Website
                        </a>
                      )}
                    </div>

                    <div className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
                      View Details →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Color Palette Test */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Color Palette Test</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-600 text-white p-4 rounded-lg">
              <div className="font-semibold">Blue 600</div>
              <div className="text-sm opacity-90">Primary Actions</div>
            </div>
            <div className="bg-purple-600 text-white p-4 rounded-lg">
              <div className="font-semibold">Purple 600</div>
              <div className="text-sm opacity-90">Very High Potential</div>
            </div>
            <div className="bg-green-600 text-white p-4 rounded-lg">
              <div className="font-semibold">Green 600</div>
              <div className="text-sm opacity-90">Confirmed Status</div>
            </div>
            <div className="bg-red-600 text-white p-4 rounded-lg">
              <div className="font-semibold">Red 600</div>
              <div className="text-sm opacity-90">Restrictions</div>
            </div>
          </div>
        </div>

        {/* Typography Test */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Typography Test</h2>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Heading 1 - Main Title</h1>
            <h2 className="text-3xl font-bold text-gray-900">Heading 2 - Section Title</h2>
            <h3 className="text-2xl font-bold text-gray-900">Heading 3 - Subsection</h3>
            <h4 className="text-xl font-bold text-gray-900">Heading 4 - Component Title</h4>
            <p className="text-lg text-gray-700">Large paragraph text for descriptions and important information.</p>
            <p className="text-base text-gray-600">Regular body text for general content and descriptions.</p>
            <p className="text-sm text-gray-500">Small text for metadata, timestamps, and secondary information.</p>
            <p className="text-xs text-gray-400">Extra small text for labels, tags, and tertiary information.</p>
          </div>
        </div>

        {/* Button Styles Test */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Button Styles Test</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Primary Button
            </button>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Secondary Button
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Outline Button
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Small Button
            </button>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium">
              Large Button
            </button>
          </div>
        </div>

        {/* Input Form Test */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Form Elements Test</h2>
          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Input</label>
              <input
                type="text"
                placeholder="Enter text here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Dropdown</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Input</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400">🔍</div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading States Test */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Loading States Test</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}