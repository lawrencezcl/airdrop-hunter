'use client'

import { useState, useEffect } from 'react'
import { AirdropCard } from '@/components/AirdropCard'
import { SearchBar } from '@/components/SearchBar'
import { mockAirdrops } from '@/lib/mock-data'

interface Airdrop {
  id: string
  name: string
  description: string
  category: string
  status: string
  blockchain: string
  token_symbol: string
  estimated_value: string
  featured: boolean
  priority: number
  potential_rating: string
  requirements: string[]
  created_at: string
  updated_at: string
}

export default function UpcomingPage() {
  const [upcomingAirdrops, setUpcomingAirdrops] = useState<Airdrop[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  
  useEffect(() => {
    // Filter mock data for upcoming airdrops only
    console.log('Upcoming page: Using mock data')
    const upcoming = mockAirdrops.filter(airdrop => airdrop.status === 'upcoming')
    setUpcomingAirdrops(upcoming)
    setLoading(false)
  }, [])

  const filteredAirdrops = upcomingAirdrops.filter(airdrop =>
    airdrop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airdrop.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="container-modern py-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Upcoming Airdrops
            </h1>
            <p className="text-xl lg:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Get early access to the most anticipated cryptocurrency airdrops before they happen
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold">
                {filteredAirdrops.length} High-Potential Airdrops Tracked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container-modern py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search upcoming airdrops..."
          />
        </div>
      </div>

      {/* Potential Rating Legend */}
      <div className="container-modern pb-8">
        <div className="bg-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Potential Rating Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <div>
                <div className="font-medium text-gray-900">Very High</div>
                <div className="text-sm text-gray-600">$1000+ potential value</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div>
                <div className="font-medium text-gray-900">High</div>
                <div className="text-sm text-gray-600">$500-1000 potential value</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <div>
                <div className="font-medium text-gray-900">Medium</div>
                <div className="text-sm text-gray-600">$100-500 potential value</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Airdrops Grid */}
      <div className="container-modern pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {filteredAirdrops.length} Upcoming Airdrop{filteredAirdrops.length !== 1 ? 's' : ''}
          </h2>
          <div className="text-sm text-gray-600">
            Sorted by potential and priority
          </div>
        </div>

        {loading ? (
          <div className="grid grid-responsive">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredAirdrops.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No upcoming airdrops found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
            <button
              onClick={() => setSearchTerm('')}
              className="btn-primary"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-responsive">
            {filteredAirdrops.map((airdrop) => (
              <AirdropCard key={airdrop.id} airdrop={airdrop} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Ahead of the Curve</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get real-time notifications when new high-potential airdrops are announced
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              Subscribe to Alerts
            </button>
            <a href="/guides" className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-blue-600">
              Read Airdrop Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}