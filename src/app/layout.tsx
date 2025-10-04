import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Airdrop Hunter - Web3 Airdrop Intelligence Platform',
  description: 'Discover and track the latest Web3 airdrops with real-time updates, comprehensive analysis, and automated data collection from multiple sources.',
  keywords: 'airdrop, web3, crypto, blockchain, defi, nft, token',
  authors: [{ name: 'Airdrop Hunter Team' }],
  openGraph: {
    title: 'Airdrop Hunter - Web3 Airdrop Intelligence',
    description: 'Discover and track the latest Web3 airdrops with real-time updates',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-white">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={cn(inter.className, "antialiased")}>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
