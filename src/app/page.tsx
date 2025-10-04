'use client'

import { useState, useEffect } from 'react'
import { AirdropCard } from '@/components/AirdropCard'
import { Airdrop, apiClient } from '@/lib/api-client'
import { MagnifyingGlassIcon, FunnelIcon, SparklesIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Home() {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([])
  const [featuredAirdrops, setFeaturedAirdrops] = useState<Airdrop[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('upcoming')

  const categories = ['all', 'Layer 2', 'DeFi', 'Gaming', 'Infrastructure', 'Social', 'Other']
  const statuses = ['upcoming', 'confirmed', 'distributed', 'ended']

  useEffect(() => {
    fetchAirdrops()
  }, [selectedCategory, selectedStatus, searchTerm])

  const fetchAirdrops = async () => {
    try {
      setLoading(true)
      console.log('🔗 Fetching airdrops from Neon database via API...')

      // Test connection first
      const isConnected = await apiClient.testConnection()
      if (!isConnected) {
        console.error('❌ Failed to connect to database API')
        setAirdrops([])
        setFeaturedAirdrops([])
        setLoading(false)
        return
      }

      console.log('✅ Connected to database API successfully')

      // Build filters object
      const filters: any = {}
      if (selectedCategory !== 'all') {
        filters.category = selectedCategory
      }
      if (selectedStatus !== 'all') {
        filters.status = selectedStatus
      }
      if (searchTerm) {
        filters.search = searchTerm
      }

      // Fetch airdrops with filters
      const fetchedAirdrops = await apiClient.getAirdrops(filters)
      console.log(`📊 Retrieved ${fetchedAirdrops.length} airdrops`)

      setAirdrops(fetchedAirdrops)

      // Get featured airdrops only if not searching
      if (!searchTerm) {
        const featured = await apiClient.getFeaturedAirdrops(3)
        setFeaturedAirdrops(featured)
      } else {
        // Set featured airdrops from search results
        const featured = fetchedAirdrops
          .filter(a => a.featured || a.priority >= 8)
          .slice(0, 3)
        setFeaturedAirdrops(featured)
      }

      setLoading(false)

    } catch (error) {
      console.error('❌ Error fetching airdrops:', error)
      setAirdrops([])
      setFeaturedAirdrops([])
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-orange-200/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative container-modern py-24 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Icon */}
            <div className="flex justify-center mb-8 animate-scale-in">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25 animate-glow">
                  <SparklesIcon className="w-10 h-10 text-white" />
                </div>
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-2xl border-2 border-blue-200 animate-pulse-subtle" />
                <div className="absolute -inset-2 rounded-2xl border border-purple-200/50 animate-pulse-subtle" style={{ animationDelay: '1s' }} />
              </div>
            </div>

            {/* Main Heading */}
            <div className="animate-slide-up mb-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Discover the Best
                <span className="block text-gradient-primary">Web3 Airdrops</span>
              </h1>
            </div>

            {/* Description */}
            <div className="animate-slide-up mb-12" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Real-time intelligence on upcoming airdrops with automated data collection from multiple sources.
                <br className="hidden sm:block" />
                Maximize your chances with expert analysis and strategic insights.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/airdrops"
                className="btn-primary text-lg px-8 py-4 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-600/30"
              >
                Browse All Airdrops
              </Link>
              <Link
                href="/guides"
                className="btn-glass text-lg px-8 py-4 group"
              >
                Learn Strategies
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {[
              { value: '500+', label: 'Airdrops Tracked', delay: '0.6s' },
              { value: '24/7', label: 'Auto Updates', delay: '0.8s' },
              { value: '50+', label: 'Data Sources', delay: '1s' },
              { value: '$10M+', label: 'Total Value', delay: '1.2s' },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-heavy rounded-2xl p-6 text-center border border-white/30 glass-shadow-sm animate-scale-in"
                style={{ animationDelay: stat.delay }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-gradient-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
                fill="url(#gradient1)"
                fillOpacity="0.1"
              />
              <defs>
                <linearGradient id="gradient1" x1="0" y1="0" x2="1440" y2="0">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Airdrops */}
      {featuredAirdrops.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-modern">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Featured Airdrops</h2>
                <p className="text-lg text-gray-600">Hand-picked opportunities with high potential returns</p>
              </div>
              <Link
                href="/airdrops?featured=true"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 rounded-xl font-medium hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group"
              >
                View all featured
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="grid-responsive-sm">
              {featuredAirdrops.map((airdrop, index) => (
                <div key={airdrop.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <AirdropCard airdrop={airdrop} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter and Search Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-modern">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Next Airdrop</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Search and filter through hundreds of verified airdrop opportunities
            </p>
          </div>

          <div className="glass-heavy rounded-3xl p-8 glass-shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search airdrops, tokens, or protocols..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-glass pl-12"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-glass appearance-none bg-white/60 cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? '🎯 All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="input-glass appearance-none bg-white/60 cursor-pointer"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === 'upcoming' ? '🚀 Upcoming' :
                       status === 'confirmed' ? '✅ Confirmed' :
                       status === 'distributed' ? '💰 Distributed' : '⏰ Ended'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Filter Tags */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
              <span className="text-sm text-gray-500 font-medium">Quick filters:</span>
              {['High Potential', 'Layer 2', 'DeFi', 'Gaming', 'No KYC'].map((filter) => (
                <button
                  key={filter}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Airdrops List */}
      <section className="py-20 bg-white">
        <div className="container-modern">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {selectedStatus === 'upcoming' ? '🚀 Upcoming Airdrops' : '🎯 All Airdrops'}
              </h2>
              <p className="text-lg text-gray-600">
                {searchTerm ? (
                  <span>Found <span className="font-semibold text-gray-900">{airdrops.length}</span> results for "{searchTerm}"</span>
                ) : (
                  <span>Showing <span className="font-semibold text-gray-900">{airdrops.length}</span> airdrop opportunities</span>
                )}
              </p>
            </div>

            {/* Sort options */}
            <div className="mt-4 lg:mt-0">
              <select className="input-modern bg-gray-50 cursor-pointer">
                <option>Sort by: Priority</option>
                <option>Sort by: Latest</option>
                <option>Sort by: Value</option>
                <option>Sort by: Ending Soon</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid-responsive">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-modern p-6">
                  <div className="skeleton-line h-6 w-3/4 mb-4"></div>
                  <div className="skeleton-paragraph h-4 w-full mb-2"></div>
                  <div className="skeleton-paragraph h-4 w-5/6 mb-4"></div>
                  <div className="skeleton-paragraph h-20 w-full"></div>
                </div>
              ))}
            </div>
          ) : airdrops.length > 0 ? (
            <div className="grid-responsive">
              {airdrops.map((airdrop, index) => (
                <div key={airdrop.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <AirdropCard airdrop={airdrop} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="glass-heavy rounded-3xl p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FunnelIcon className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No airdrops found</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                    setSelectedStatus('upcoming')
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Load More Button */}
          {airdrops.length > 0 && airdrops.length >= 20 && (
            <div className="text-center mt-12">
              <button className="btn-secondary">
                Load More Airdrops
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
