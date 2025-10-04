// Simple test to verify mock data loading
const { mockAirdrops } = require('./src/lib/mock-data.ts')

console.log('Mock data test:')
console.log('Number of airdrops:', mockAirdrops.length)
console.log('First airdrop:', mockAirdrops[0]?.name)
console.log('Airdrop names:', mockAirdrops.map(a => a.name).slice(0, 5))

module.exports = {
  mockAirdrops
}