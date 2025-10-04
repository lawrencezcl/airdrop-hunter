export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 text-white">
        <div className="container-modern py-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Airdrop Guides
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Master the art of cryptocurrency airdrops with our comprehensive guides
            </p>
          </div>
        </div>
      </div>

      {/* Guide Categories */}
      <div className="container-modern py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Beginner Guides</h3>
            <p className="text-gray-600 mb-4">
              Start your airdrop journey with the basics
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• What are crypto airdrops?</li>
              <li>• How to prepare for airdrops</li>
              <li>• Essential tools and wallets</li>
              <li>• Common mistakes to avoid</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Advanced Strategies</h3>
            <p className="text-gray-600 mb-4">
              Maximize your airdrop potential with expert strategies
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Multi-wallet strategies</li>
              <li>• Sybil resistance techniques</li>
              <li>• Timing and participation tactics</li>
              <li>• Risk management</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Security & Safety</h3>
            <p className="text-gray-600 mb-4">
              Protect yourself from scams and security risks
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Identifying legitimate airdrops</li>
              <li>• Wallet security best practices</li>
              <li>• Avoiding phishing attempts</li>
              <li>• Secure transaction methods</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Featured Guides */}
      <div className="container-modern pb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Guides</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-6xl">📖</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Complete Airdrop Guide 2024</h3>
              <p className="text-gray-600 mb-4">
                Everything you need to know about participating in cryptocurrency airdrops, from basics to advanced strategies.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">15 min read</span>
                <button className="btn-primary text-sm">Read More</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
              <span className="text-6xl">💰</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Maximizing Airdrop Profits</h3>
              <p className="text-gray-600 mb-4">
                Learn professional strategies to identify high-value airdrops and maximize your returns while minimizing risks.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">20 min read</span>
                <button className="btn-primary text-sm">Read More</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-6xl">🔒</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Airdrop Security Guide</h3>
              <p className="text-gray-600 mb-4">
                Essential security practices to protect your assets while participating in airdrops and avoiding common scams.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">12 min read</span>
                <button className="btn-primary text-sm">Read More</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <span className="text-6xl">🛠️</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Essential Tools & Resources</h3>
              <p className="text-gray-600 mb-4">
                Discover the best tools, wallets, and resources to streamline your airdrop hunting and stay organized.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">10 min read</span>
                <button className="btn-primary text-sm">Read More</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container-modern">
          <h2 className="text-3xl font-bold text-center mb-12">Essential Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👛</span>
              </div>
              <h3 className="font-semibold mb-2">Wallets</h3>
              <p className="text-gray-400 text-sm">
                MetaMask, Rabby, Trust Wallet
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌉</span>
              </div>
              <h3 className="font-semibold mb-2">Bridges</h3>
              <p className="text-gray-400 text-sm">
                LayerZero, Official Bridges
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-gray-400 text-sm">
                Dune Analytics, Nansen
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="font-semibold mb-2">News</h3>
              <p className="text-gray-400 text-sm">
                Twitter, Discord, Telegram
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}