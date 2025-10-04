# Deployment Guide - Airdrop Hunter

This guide will help you deploy the Airdrop Hunter platform to Vercel with automated data collection.

## 🚀 Quick Deploy to Vercel

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy

```bash
vercel --prod
```

## 📋 Prerequisites

1. **Vercel Account**: Create account at [vercel.com](https://vercel.com)
2. **Supabase Project**: Create project at [supabase.com](https://supabase.com)
3. **Domain**: Optional custom domain

## 🔧 Environment Variables Setup

### In Vercel Dashboard

Go to your Vercel project → Settings → Environment Variables and add:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here

# Scraping Configuration
SCRAPER_API_KEY=generate_secure_random_string_here
CRON_SECRET=generate_another_secure_random_string_here

# Next.js Configuration
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate_secure_nextauth_secret_here
```

### Generate Secure Keys

Use these commands to generate secure keys:

```bash
# Generate API keys
openssl rand -base64 32

# Generate Next.js secret
openssl rand -base64 64
```

## 🗄️ Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and database settings
4. Wait for project to be ready

### 2. Run Database Schema

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the content from `supabase/schema.sql`
3. Click "Run" to execute the schema

### 3. Get API Keys

1. Go to Supabase Dashboard → Settings → API
2. Copy the Project URL (for NEXT_PUBLIC_SUPABASE_URL)
3. Copy the anon/public key (for NEXT_PUBLIC_SUPABASE_ANON_KEY)
4. Copy the service_role key (for SUPABASE_SERVICE_ROLE_KEY)

## ⚙️ Automated Scraping Setup

### Option 1: Vercel Cron Jobs (Recommended)

1. Go to Vercel Dashboard → Your Project → Settings → Cron Jobs
2. Add new cron job:
   - **Cron Expression**: `0 */2 * * *` (every 2 hours)
   - **URL**: `/api/cron/scrape`
   - **HTTP Method**: `POST`
   - **Headers**: `Authorization: Bearer YOUR_CRON_SECRET`

### Option 2: External Cron Services

Use services like:

- **EasyCron**: [easycron.com](https://www.easycron.com)
- **Cron-job.org**: [cron-job.org](https://cron-job.org)
- **GitHub Actions**: Set up workflow

Example webhook call:
```bash
curl -X POST https://your-domain.vercel.app/api/cron/scrape \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## 🛠️ Manual Testing

### Test Scraping API

```bash
curl -X POST https://your-domain.vercel.app/api/scrape \
  -H "Authorization: Bearer YOUR_SCRAPER_API_KEY"
```

### Test Database Connection

Add this test endpoint temporarily to check database connectivity:

```javascript
// pages/api/test-db.js
import { supabase } from '../../src/lib/supabase'

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('airdrops')
      .select('count')
      .single()

    if (error) throw error

    res.status(200).json({ success: true, count: data.count })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Build Errors
- **Issue**: `Invalid supabaseUrl` error
- **Fix**: Ensure NEXT_PUBLIC_SUPABASE_URL is HTTPS format, not PostgreSQL connection string

#### 2. API Errors
- **Issue**: 401 Unauthorized on scraping endpoints
- **Fix**: Check API keys in Vercel environment variables

#### 3. Database Connection
- **Issue**: Connection timeouts
- **Fix**: Check Supabase project status and RLS policies

#### 4. Real-time Updates Not Working
- **Issue**: WebSocket connection failed
- **Fix**: Ensure RLS policies allow real-time subscriptions

### Debug Mode

Add this to your page for debugging:

```javascript
// Enable debug mode
if (typeof window !== 'undefined') {
  window.DEBUG_AIRDROP_HUNTER = true
}
```

## 📊 Monitoring

### Vercel Analytics

1. Go to Vercel Dashboard → Your Project → Analytics
2. Monitor page views, API calls, and performance

### Supabase Monitoring

1. Go to Supabase Dashboard → Reports
2. Monitor database usage and API calls

### Custom Monitoring

Add health check endpoint:

```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
}
```

## 🔒 Security Considerations

### API Key Security

1. **Never commit API keys to git**
2. **Use different keys for development and production**
3. **Rotate keys regularly**

### Database Security

1. **Enable Row Level Security (RLS)**
2. **Use service role key only on server-side**
3. **Limit database connections**

### Rate Limiting

Consider adding rate limiting:

```javascript
// Example rate limiting middleware
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
```

## 🎛️ Performance Optimization

### Caching

1. **Vercel Edge Caching**: Automatic for static assets
2. **Database Query Caching**: Consider Redis for frequent queries
3. **API Response Caching**: Cache scraping results

### Database Optimization

1. **Add indexes** to frequently queried columns
2. **Use pagination** for large datasets
3. **Optimize queries** with proper filters

## 📈 Scaling

### Database Scaling

- **Supabase Pro**: For higher usage
- **Connection Pooling**: For concurrent requests
- **Read Replicas**: For read-heavy workloads

### Application Scaling

- **Serverless Functions**: Automatic scaling on Vercel
- **CDN**: Global distribution through Vercel Edge Network
- **Load Balancing**: Automatic with Vercel

## 🔄 Continuous Deployment

### GitHub Integration

1. Connect Vercel to GitHub repository
2. Enable automatic deployments on push to main
3. Set up preview deployments for pull requests

### Deployment Workflow

```bash
# Development
git push origin feature/new-feature
# Creates preview deployment

# Production
git push origin main
# Automatic production deployment
```

## 📞 Support

If you encounter issues:

1. **Check Vercel logs**: Dashboard → Functions → Logs
2. **Check Supabase logs**: Dashboard → Logs
3. **GitHub Issues**: Report bugs in repository
4. **Documentation**: Check README.md and inline comments

---

**Your Airdrop Hunter platform is now ready for production! 🚀**