'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { BellIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { formatDistanceToNow } from 'date-fns'

interface Update {
  id: string
  type: 'new_airdrop' | 'status_change' | 'featured' | 'high_potential'
  message: string
  airdrop_name?: string
  timestamp: string
  read: boolean
}

export function RealTimeUpdates() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    fetchUpdates()
    setupRealtimeSubscription()
  }, [])

  const fetchUpdates = async () => {
    try {
      // Simulate fetching updates from a notifications table
      // In production, this would fetch from a real notifications system
      const mockUpdates: Update[] = [
        {
          id: '1',
          type: 'new_airdrop',
          message: 'New Layer 2 airdrop opportunity detected',
          airdrop_name: 'zkSync Era',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          read: false
        },
        {
          id: '2',
          type: 'high_potential',
          message: 'High potential airdrop identified',
          airdrop_name: 'Linea',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          read: false
        },
        {
          id: '3',
          type: 'status_change',
          message: 'Airdrop status updated to confirmed',
          airdrop_name: 'StarkNet',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          read: true
        }
      ]

      setUpdates(mockUpdates)
      setUnreadCount(mockUpdates.filter(u => !u.read).length)
    } catch (error) {
      console.error('Error fetching updates:', error)
    }
  }

  const setupRealtimeSubscription = () => {
    // Set up real-time subscription to airdrops table
    const subscription = supabase
      .channel('airdrops_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'airdrops'
        },
        (payload) => {
          handleRealtimeUpdate(payload)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }

  const handleRealtimeUpdate = (payload: any) => {
    const newUpdate: Update = {
      id: Date.now().toString(),
      type: payload.eventType === 'INSERT' ? 'new_airdrop' : 'status_change',
      message: generateUpdateMessage(payload),
      airdrop_name: payload.new?.name || payload.old?.name,
      timestamp: new Date().toISOString(),
      read: false
    }

    setUpdates(prev => [newUpdate, ...prev].slice(0, 20)) // Keep only last 20 updates
    setUnreadCount(prev => prev + 1)
  }

  const generateUpdateMessage = (payload: any): string => {
    switch (payload.eventType) {
      case 'INSERT':
        return `New airdrop opportunity: ${payload.new.name}`
      case 'UPDATE':
        return `Status update: ${payload.new.name} is now ${payload.new.status}`
      default:
        return 'Airdrop data updated'
    }
  }

  const markAsRead = (updateId: string) => {
    setUpdates(prev =>
      prev.map(update =>
        update.id === updateId ? { ...update, read: true } : update
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setUpdates(prev => prev.map(update => ({ ...update, read: true })))
    setUnreadCount(0)
  }

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'new_airdrop':
        return '🎯'
      case 'high_potential':
        return '⭐'
      case 'status_change':
        return '📊'
      case 'featured':
        return '🔥'
      default:
        return 'ℹ️'
    }
  }

  const getUpdateColor = (type: string) => {
    switch (type) {
      case 'new_airdrop':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'high_potential':
        return 'text-purple-600 bg-purple-50 border-purple-200'
      case 'status_change':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'featured':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-20 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Real-time Updates</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => {
                    fetchUpdates()
                    setIsOpen(false)
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Updates List */}
            <div className="max-h-80 overflow-y-auto">
              {updates.length > 0 ? (
                updates.map((update) => (
                  <div
                    key={update.id}
                    className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${!update.read ? 'bg-blue-50/30' : ''}`}
                    onClick={() => markAsRead(update.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-xl">
                        {getUpdateIcon(update.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mb-2 ${getUpdateColor(update.type)}`}>
                          {update.type.replace('_', ' ')}
                        </div>
                        <p className="text-sm text-gray-900 mb-1">
                          {update.message}
                        </p>
                        {update.airdrop_name && (
                          <p className="text-xs text-blue-600 font-medium mb-1">
                            {update.airdrop_name}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(update.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                      {!update.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BellIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-sm">No updates yet</p>
                  <p className="text-gray-400 text-xs mt-1">
                    We'll notify you of new airdrop opportunities
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {updates.length > 0 && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={() => {
                    fetchUpdates()
                    setIsOpen(false)
                  }}
                  className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Refresh Updates
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}