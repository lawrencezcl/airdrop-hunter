'use client'

import { AirdropCard } from './AirdropCard'
import { mockAirdrops } from '@/lib/mock-data'

export function MockDataDisplay() {
  console.log('MockDataDisplay: Rendering with', mockAirdrops.length, 'airdrops')

  return (
    <div className="grid grid-responsive">
      {mockAirdrops.map((airdrop) => (
        <AirdropCard key={airdrop.id} airdrop={airdrop} />
      ))}
    </div>
  )
}