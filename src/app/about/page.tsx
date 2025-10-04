export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="container-modern py-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About Airdrop Hunter
            </h1>
            <p className="text-xl lg:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Your trusted companion in the world of cryptocurrency airdrops
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container-modern py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              We're dedicated to making cryptocurrency airdrops accessible to everyone. Our platform
              provides the tools, information, and guidance needed to successfully participate in
              the most promising airdrop opportunities.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Since 2023, we've helped thousands of users claim millions of dollars in airdrop
              rewards while maintaining the highest standards of security and user experience.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">$10M+</div>
                <div className="text-gray-600">Airdrop Value Tracked</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">Transparency</div>
                    <div className="text-blue-100 text-sm">Clear, honest information about all opportunities</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">Security First</div>
                    <div className="text-blue-100 text-sm">Your safety is our top priority</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">Community Driven</div>
                    <div className="text-blue-100 text-sm">Built by the community, for the community</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container-modern">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Airdrop Hunter?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with expert insights to deliver the best airdrop experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
              <p className="text-gray-600">
                Get instant notifications about new airdrops and important updates
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Research</h3>
              <p className="text-gray-600">
                Our team thoroughly vets each project for legitimacy and potential
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
              <p className="text-gray-600">
                Detailed insights and potential value calculations for each airdrop
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Security Focus</h3>
              <p className="text-gray-600">
                Built-in scam detection and security best practices
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Support</h3>
              <p className="text-gray-600">
                Join thousands of successful airdrop hunters in our community
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Early Access</h3>
              <p className="text-gray-600">
                Get notified about opportunities before they go public
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container-modern py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built by experienced crypto enthusiasts and blockchain developers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Alex Chen</h3>
            <p className="text-gray-600 mb-2">Founder & CEO</p>
            <p className="text-sm text-gray-500">8+ years in DeFi and blockchain</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
            <p className="text-gray-600 mb-2">Head of Research</p>
            <p className="text-sm text-gray-500">Expert in project analysis</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Mike Park</h3>
            <p className="text-gray-600 mb-2">Lead Developer</p>
            <p className="text-sm text-gray-500">Full-stack blockchain expert</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Emily Davis</h3>
            <p className="text-gray-600 mb-2">Community Manager</p>
            <p className="text-sm text-gray-500">Building our global community</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container-modern">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Airdrops Tracked</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Monitoring</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Data Sources</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container-modern py-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span>📧</span>
                </div>
                <span>support@airdrophunter.com</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span>💬</span>
                </div>
                <span>Discord Community</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span>🐦</span>
                </div>
                <span>@AirdropHunter</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Join Our Community</button>
              <button className="btn-secondary">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}