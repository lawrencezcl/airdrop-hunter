# Airdrop Hunter - Web3 Airdrop Intelligence Platform

A comprehensive Web3 airdrop tracking platform with automated data collection, real-time updates, and modern UI design. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Automated Data Collection**: Scrapes multiple sources for latest airdrop opportunities
- **Real-time Updates**: Live notifications when new airdrops are detected
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Advanced Filtering**: Search and filter by category, status, blockchain
- **Priority Scoring**: AI-powered potential rating for each airdrop
- **Multi-language Support**: Both English and Chinese airdrop sources
- **Risk Assessment**: Built-in security warnings and eligibility criteria
- **Mobile Optimized**: Fully responsive design for all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **UI Components**: Headless UI, Heroicons
- **Real-time**: Supabase Realtime
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Vercel account (for deployment)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/airdrop-hunter.git
   cd airdrop-hunter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

   # Scraping Configuration
   SCRAPER_API_KEY=your_scraper_api_key_here

   # Next.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL schema from `supabase/schema.sql`
   - Get your API keys from Supabase settings

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 🗄️ Database Schema

The platform uses the following main tables:

- **airdrops**: Core airdrop information
- **airdrop_sources**: Data sources for scraping
- **scraping_logs**: History of data collection
- **subscriptions**: User notification preferences

See `supabase/schema.sql` for complete schema.

## 🤖 Automated Scraping

The platform includes an automated scraping system that:

1. **Collects from multiple sources**: Airdrops.io, DeFi Llama, DappRadar, CoinMarketCap
2. **Processes data**: Normalizes categories, blockchains, and requirements
3. **Scores opportunities**: Calculates priority and potential ratings
4. **Updates in real-time**: Uses Supabase realtime for live updates

### Manual Scraping

```bash
curl -X POST http://localhost:3000/api/scrape \
  -H "Authorization: Bearer your_scraper_api_key"
```

### Automated Scraping

Deploy with Vercel Cron Jobs or use external cron services:

```bash
# Every 2 hours
curl -X POST https://your-domain.vercel.app/api/cron/scrape \
  -H "Authorization: Bearer your_cron_secret"
```

## 🎨 Customization

### Adding New Data Sources

1. Update `lib/scraper.ts` to add new sources
2. Implement source-specific extraction logic
3. Add to the sources array with proper categorization

### UI Customization

- Modify `tailwind.config.js` for theme changes
- Update components in `src/components/`
- Adjust styling in `src/app/globals.css`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set environment variables in Vercel Dashboard**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SCRAPER_API_KEY`
   - `CRON_SECRET`

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set up Cron Jobs** (optional)
   - Use Vercel Cron Jobs for automated scraping
   - Schedule: `0 */2 * * *` (every 2 hours)

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_prod_service_key
SCRAPER_API_KEY=your_secure_scraper_key
CRON_SECRET=your_secure_cron_secret
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_secure_nextauth_secret
```

## 📊 Features Deep Dive

### Real-time Updates

The platform uses Supabase Realtime to provide:
- Instant notifications for new airdrops
- Status change updates
- Live priority score adjustments

### Advanced Filtering

Users can filter by:
- **Category**: Layer 2, DeFi, Gaming, Infrastructure, Social
- **Status**: Upcoming, Confirmed, Distributed, Ended
- **Blockchain**: Ethereum, Arbitrum, Optimism, Polygon, etc.
- **Search**: Name and description search
- **Potential**: Low, Medium, High, Very High

### Priority Scoring

Each airdrop is scored based on:
- **Team credibility** (30%)
- **Backing and funding** (25%)
- **Technology and innovation** (20%)
- **Community engagement** (15%)
- **Market timing** (10%)

## 🔒 Security Considerations

- **Rate limiting**: All API endpoints are rate-limited
- **Input validation**: All user inputs are sanitized
- **HTTPS only**: Production enforces HTTPS
- **CORS protection**: Proper CORS configuration
- **Authentication**: API keys for scraping endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**Not Financial Advice**: This platform is for informational purposes only. Always do your own research before participating in any airdrop. Airdrop hunting carries inherent risks including:

- Potential loss of funds through gas fees
- Smart contract vulnerabilities
- Regulatory restrictions
- Market volatility
- Scam projects

## 🆘 Support

- **Documentation**: Check the `/docs` route for detailed guides
- **Issues**: Report bugs via GitHub Issues
- **Discord**: Join our community [link]
- **Twitter**: Follow us [@AirdropHunter](https://twitter.com/AirdropHunter)

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Telegram bot for notifications
- [ ] Advanced analytics dashboard
- [ ] AI-powered eligibility checker
- [ ] Portfolio tracking integration
- [ ] Governance participation tracking
- [ ] Cross-chain bridge optimization
- [ ] Custom alert system
- [ ] API for third-party integrations

---

**Built with ❤️ for the Web3 community**
