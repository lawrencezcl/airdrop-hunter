import { Airdrop } from '@/lib/supabase'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShareIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  TagIcon,
  UserGroupIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { cn, getStatusColors, getPotentialRatingColors, getBlockchainIcon, formatCurrency, formatRelativeTime } from '@/lib/utils'

interface AirdropCardProps {
  airdrop: Airdrop
  compact?: boolean
}

  export function AirdropCard({ airdrop, compact = false }: AirdropCardProps) {
  const statusColors = getStatusColors(airdrop.status)
  const potentialColors = getPotentialRatingColors(airdrop.potential_rating)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <ClockIcon className="w-4 h-4" />
      case 'confirmed': return <CheckCircleIcon className="w-4 h-4" />
      case 'distributed': return <CurrencyDollarIcon className="w-4 h-4" />
      case 'ended': return <XCircleIcon className="w-4 h-4" />
      default: return <ClockIcon className="w-4 h-4" />
    }
  }

  if (compact) {
    return (
      <div className="card-modern p-4 group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {airdrop.name}
              </h3>
              {airdrop.featured && (
                <StarIconSolid className="w-4 h-4 text-yellow-500" />
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                {getBlockchainIcon(airdrop.blockchain)}
                {airdrop.blockchain}
              </span>
              <span className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                statusColors.bg, statusColors.text, statusColors.border
              )}>
                {getStatusIcon(airdrop.status)}
                {airdrop.status}
              </span>
            </div>
          </div>
        </div>
        {airdrop.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{airdrop.description}</p>
        )}
      </div>
    )
  }

  return (
    <div className="card-modern p-6 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {airdrop.name}
            </h3>
            {airdrop.featured && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 rounded-full text-xs font-semibold border border-yellow-200">
                <StarIconSolid className="w-3 h-3" />
                Featured
              </div>
            )}
            {airdrop.china_restricted && (
              <div className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
                <ExclamationTriangleIcon className="w-3 h-3" />
                CN Restricted
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap text-sm">
            <span className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg font-medium text-gray-700">
              {getBlockchainIcon(airdrop.blockchain)}
              {airdrop.blockchain}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-lg font-medium text-blue-700">
              <TagIcon className="w-3 h-3" />
              {airdrop.category}
            </span>
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              statusColors.bg, statusColors.text, statusColors.border
            )}>
              {getStatusIcon(airdrop.status)}
              {airdrop.status}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className={cn(
            "px-3 py-1 rounded-lg text-sm font-semibold",
            potentialColors.bg, potentialColors.text, potentialColors.border
          )}>
            {potentialColors.label}
          </div>
          <div className="text-xs text-gray-500 font-medium">
            Priority: {airdrop.priority}/10
          </div>
        </div>
      </div>

      {/* Description */}
      {airdrop.description && (
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {airdrop.description}
        </p>
      )}

      {/* Key Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {airdrop.token_symbol && (
          <div className="glass-light rounded-xl p-3 border border-white/20">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <TagIcon className="w-3 h-3" />
              Token Symbol
            </div>
            <div className="font-semibold text-gray-900">{airdrop.token_symbol}</div>
          </div>
        )}

        {airdrop.estimated_value && (
          <div className="glass-light rounded-xl p-3 border border-white/20">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <CurrencyDollarIcon className="w-3 h-3" />
              Est. Value
            </div>
            <div className="font-semibold text-gray-900">{airdrop.estimated_value}</div>
          </div>
        )}

        {airdrop.distribution_date && (
          <div className="glass-light rounded-xl p-3 border border-white/20">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <CalendarIcon className="w-3 h-3" />
              Distribution
            </div>
            <div className="font-semibold text-gray-900 text-sm">
              {formatRelativeTime(airdrop.distribution_date)}
            </div>
          </div>
        )}

        <div className="glass-light rounded-xl p-3 border border-white/20">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <UserGroupIcon className="w-3 h-3" />
            Eligibility
          </div>
          <div className="font-semibold text-gray-900">
            {airdrop.eligibility_criteria?.length || 0} requirements
          </div>
        </div>
      </div>

      {/* Requirements Preview */}
      {airdrop.requirements && airdrop.requirements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-green-500" />
            Key Requirements:
          </h4>
          <div className="flex flex-wrap gap-2">
            {airdrop.requirements.slice(0, 3).map((req, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                {req}
              </span>
            ))}
            {airdrop.requirements.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                +{airdrop.requirements.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {airdrop.official_website && (
            <Link
              href={airdrop.official_website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-600/30 group"
            >
              <GlobeAltIcon className="w-4 h-4" />
              Visit
              <ArrowTopRightOnSquareIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          )}

          {airdrop.twitter_handle && (
            <Link
              href={`https://twitter.com/${airdrop.twitter_handle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 glass-light border border-white/20 text-gray-700 rounded-xl hover:glass-shadow transition-all duration-300 text-sm font-medium"
            >
              <ShareIcon className="w-4 h-4" />
              Twitter
            </Link>
          )}
        </div>

        <Link
          href={`/airdrops/${airdrop.id}`}
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors group"
        >
          View Details
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}