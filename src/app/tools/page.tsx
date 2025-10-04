export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white">
        <div className="container-modern py-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Airdrop Tools
            </h1>
            <p className="text-xl lg:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Professional tools and resources to optimize your airdrop hunting strategy
            </p>
          </div>
        </div>
      </div>

      {/* Tools Categories */}
      <div className="container-modern py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Essential Airdrop Tools</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to track, analyze, and maximize your airdrop opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Wallet Tools */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">👛</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Wallet Management</h3>
            <p className="text-gray-600 mb-4">
              Multi-wallet tools to manage and track your airdrop eligibility
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Multi-Wallet Tracker</span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Free</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Wallet Health Checker</span>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Pro</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Gas Fee Optimizer</span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Free</span>
              </div>
            </div>
          </div>

          {/* Analytics Tools */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Analytics & Tracking</h3>
            <p className="text-gray-600 mb-4">
              Advanced analytics to identify high-potential airdrops
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Airdrop Scanner</span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Free</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Potential Calculator</span>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Pro</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Historical Tracker</span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Free</span>
              </div>
            </div>
          </div>

          {/* Automation Tools */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Automation</h3>
            <p className="text-gray-600 mb-4">
              Automate your airdrop hunting and save time
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Auto-Sniper</span>
                <span className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded">Premium</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Task Scheduler</span>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Pro</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Alert Bot</span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Free</span>
              </div>
            </div>
          </div>

          {/* Security Tools */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Security</h3>
            <p className="text-gray-600 mb-4">
              Protect your assets with advanced security tools
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Scam Detector</span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Free</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Contract Analyzer</span>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Pro</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Privacy Shield</span>
                <span className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded">Premium</span>
              </div>
            </div>
          </div>

          {/* Research Tools */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Research & Due Diligence</h3>
            <p className="text-gray-600 mb-4">
              Comprehensive research tools for project analysis
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Project Analyzer</span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Free</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Team Vetting</span>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Pro</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Funding Tracker</span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Free</span>
              </div>
            </div>
          </div>

          {/* Community Tools */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Community & Social</h3>
            <p className="text-gray-600 mb-4">
              Connect with other airdrop hunters and share insights
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Alpha Group</span>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Pro</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Signal Sharing</span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Free</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Leaderboard</span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Comparisons */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container-modern">
          <h2 className="text-3xl font-bold text-center mb-12">Tool Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="pb-4">Tool</th>
                  <th className="pb-4">Free Plan</th>
                  <th className="pb-4">Pro Plan</th>
                  <th className="pb-4">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-4">Airdrop Scanner</td>
                  <td className="py-4">✅ 5 scans/day</td>
                  <td className="py-4">✅ Unlimited</td>
                  <td className="py-4">✅ API Access</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4">Multi-Wallet Tracker</td>
                  <td className="py-4">✅ 3 wallets</td>
                  <td className="py-4">✅ 10 wallets</td>
                  <td className="py-4">✅ Unlimited</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4">Auto-Sniper</td>
                  <td className="py-4">❌</td>
                  <td className="py-4">❌</td>
                  <td className="py-4">✅ Full Access</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4">Alert Bot</td>
                  <td className="py-4">✅ Basic alerts</td>
                  <td className="py-4">✅ Custom alerts</td>
                  <td className="py-4">✅ Priority alerts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container-modern py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Get Started with Our Tools</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of successful airdrop hunters using our professional tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
            </button>
            <button className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-blue-600">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}