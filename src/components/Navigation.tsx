'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import { RealTimeUpdates } from './RealTimeUpdates'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Airdrops', href: '/airdrops', current: false },
  { name: 'Upcoming', href: '/upcoming', current: false },
  { name: 'Guides', href: '/guides', current: false },
  { name: 'Tools', href: '/tools', current: false },
  { name: 'About', href: '/about', current: false },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-heavy shadow-lg shadow-gray-200/20 border-b border-white/20"
          : "bg-white/80 backdrop-blur-md border-b border-gray-100"
      )}>
        <div className="container-modern">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900">Airdrop</span>
                  <span className="text-xl font-bold text-gradient-primary ml-1">Hunter</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-200 text-sm font-medium">
                <MagnifyingGlassIcon className="w-4 h-4" />
                <span>Search</span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all duration-200">
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* RealTime Updates */}
              <div className="hidden md:block">
                <RealTimeUpdates />
              </div>

              {/* CTA Button */}
              <button className="hidden sm:block btn-primary text-sm px-4 py-2">
                Get Started
              </button>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  type="button"
                  className="p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-heavy border-t border-white/20 animate-slide-down">
            <div className="container-modern py-4">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full btn-primary">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-16" />
    </>
  )
}