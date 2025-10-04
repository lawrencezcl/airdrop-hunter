'use client'

import { useState, useEffect } from 'react'
import { AirdropCard } from '@/components/AirdropCard'
import { SearchBar } from '@/components/SearchBar'
import { FilterBar } from '@/components/FilterBar'
import { Airdrop, apiClient } from '@/lib/api-client'

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
  official_links: any[]
  created_at: string
  updated_at: string
}

export default function AirdropsPage() {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([])
  const [filteredAirdrops, setFilteredAirdrops] = useState<Airdrop[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  
  useEffect(() => {
    const fetchAirdrops = async () => {
      try {
        setLoading(true)
        console.log('🔗 Airdrops page: Fetching from Neon database via API...')

        const fetchedAirdrops = await apiClient.getAirdrops({ limit: 100 })
        console.log(`📊 Airdrops page: Retrieved ${fetchedAirdrops.length} airdrops`)

        setAirdrops(fetchedAirdrops)
        setFilteredAirdrops(fetchedAirdrops)
        setLoading(false)

      } catch (error) {
        console.error('❌ Airdrops page: Error fetching from Neon API:', error)
        setAirdrops([])
        setFilteredAirdrops([])
        setLoading(false)
      }
    }

    fetchAirdrops()
  }, [])

  useEffect(() => {
    let filtered = airdrops

    if (searchTerm) {
      filtered = filtered.filter(airdrop =>
        airdrop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airdrop.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(airdrop => airdrop.category === selectedCategory)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(airdrop => airdrop.status === selectedStatus)
    }

    setFilteredAirdrops(filtered)
  }, [airdrops, searchTerm, selectedCategory, selectedStatus])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container-modern py-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Web3 Airdrops
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover and track the latest cryptocurrency airdrops from quality projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#airdrops" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                Browse Airdrops
              </a>
              <a href="/guides" className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-blue-600">
                Learn How
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container-modern py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search airdrops by name or description..."
              />
            </div>
            <div className="flex gap-4">
              <FilterBar
                selectedCategory={selectedCategory}
                selectedStatus={selectedStatus}
                onCategoryChange={setSelectedCategory}
                onStatusChange={setSelectedStatus}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Airdrops Grid */}
      <div id="airdrops" className="container-modern pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {filteredAirdrops.length} Airdrop{filteredAirdrops.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="text-sm text-gray-600">
            {filteredAirdrops.filter(a => a.featured).length} Featured
          </div>
        </div>

        {loading ? (
          <div className="grid grid-responsive">
            {[...Array(6)].map((_, i) => (
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
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No airdrops found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedStatus('all')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-responsive">
            {filteredAirdrops.map((airdrop) => (
              <AirdropCard key={airdrop.id} airdrop={airdrop} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}