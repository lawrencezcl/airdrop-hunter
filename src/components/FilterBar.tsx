'use client'

interface FilterBarProps {
  selectedCategory: string
  selectedStatus: string
  onCategoryChange: (category: string) => void
  onStatusChange: (status: string) => void
}

export function FilterBar({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange
}: FilterBarProps) {
  const categories = [
    { value: 'all', label: '🎯 All Categories' },
    { value: 'Layer 1', label: '⛓️ Layer 1' },
    { value: 'Layer 2', label: '🔗 Layer 2' },
    { value: 'DeFi', label: '💰 DeFi' },
    { value: 'Gaming', label: '🎮 Gaming' },
    { value: 'Infrastructure', label: '🏗️ Infrastructure' },
    { value: 'Social', label: '👥 Social' },
    { value: 'Other', label: '📦 Other' }
  ]

  const statuses = [
    { value: 'all', label: '📋 All Status' },
    { value: 'upcoming', label: '🚀 Upcoming' },
    { value: 'confirmed', label: '✅ Confirmed' },
    { value: 'distributed', label: '💰 Distributed' },
    { value: 'ended', label: '⏰ Ended' }
  ]

  return (
    <div className="flex gap-2">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        {categories.map(category => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        {statuses.map(status => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  )
}