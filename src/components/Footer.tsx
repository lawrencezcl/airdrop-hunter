import Link from 'next/link'
import { SparklesIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

const footerLinks = {
  product: [
    { name: 'Features', href: '/features', description: 'Platform capabilities' },
    { name: 'Pricing', href: '/pricing', description: 'Flexible plans' },
    { name: 'API', href: '/api', description: 'Developer access' },
    { name: 'Documentation', href: '/docs', description: 'Get started' },
  ],
  resources: [
    { name: 'Airdrop Guides', href: '/guides', description: 'Learn strategies' },
    { name: 'Blog', href: '/blog', description: 'Latest insights' },
    { name: 'Community', href: '/community', description: 'Join the discussion' },
    { name: 'Support', href: '/support', description: 'Get help' },
  ],
  company: [
    { name: 'About', href: '/about', description: 'Our story' },
    { name: 'Careers', href: '/careers', description: 'Join our team' },
    { name: 'Contact', href: '/contact', description: 'Get in touch' },
    { name: 'Privacy Policy', href: '/privacy', description: 'Your privacy' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms', description: 'Terms and conditions' },
    { name: 'Disclaimer', href: '/disclaimer', description: 'Important notices' },
    { name: 'Risk Warning', href: '/risk', description: 'Investment risks' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: '#', icon: '🐦' },
  { name: 'Discord', href: '#', icon: '💬' },
  { name: 'GitHub', href: '#', icon: '🐙' },
  { name: 'Telegram', href: '#', icon: '✈️' },
]

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500" />
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative container-modern py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-600/30 transition-all duration-300">
                  <SparklesIcon className="w-7 h-7 text-white" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              <div>
                <span className="text-2xl font-bold">Airdrop</span>
                <span className="text-2xl font-bold text-gradient-primary ml-1">Hunter</span>
              </div>
            </Link>

            <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
              Your comprehensive Web3 airdrop intelligence platform. Discover, track, and maximize your airdrop opportunities with real-time data and expert insights.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link Sections */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-6">Product</h3>
            <ul className="space-y-4">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex flex-col"
                  >
                    <span className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                      {item.name}
                    </span>
                    <span className="text-gray-500 text-xs mt-1">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-6">Resources</h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex flex-col"
                  >
                    <span className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                      {item.name}
                    </span>
                    <span className="text-gray-500 text-xs mt-1">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-6">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex flex-col"
                  >
                    <span className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                      {item.name}
                    </span>
                    <span className="text-gray-500 text-xs mt-1">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-6">Legal</h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex flex-col"
                  >
                    <span className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                      {item.name}
                    </span>
                    <span className="text-gray-500 text-xs mt-1">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Airdrop Hunter. All rights reserved.</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚠️</span>
                <span>Not financial advice. Always do your own research.</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="w-4 h-4" />
                <span>support@airdrophunter.io</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <MapPinIcon className="w-4 h-4" />
                <span>Global</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
      </div>
    </footer>
  )
}