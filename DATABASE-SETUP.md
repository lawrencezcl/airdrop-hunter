# Database Setup Guide

This guide will help you set up a real Supabase database and populate it with comprehensive airdrop data.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "New Project"
3. Sign in/up with your GitHub account
4. Click "New Project"
5. Choose your organization
6. Enter project details:
   - **Name**: `airdrop-hunter`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Wait 1-2 minutes** for project creation

### Step 2: Get Your Credentials

1. Go to your project dashboard
2. Click **Settings** > **API**
3. Copy these values:

```
Project URL: https://[YOUR-PROJECT-ID].supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Update Environment Variables

Update your `.env.local` file with real credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_real_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_real_service_role_key_here
SUPABASE_DB_URL=postgresql://postgres:your_password@db.your-project-id.supabase.co:5432/postgres
```

### Step 4: Run Database Setup

```bash
# Run the setup script
npm run setup-db

# Or manually execute the SQL
# Go to Supabase Dashboard > Settings > Database > SQL Editor
# Copy and paste the contents of database-setup.sql
```

### Step 5: Seed with Data

```bash
npm run seed
```

## 📊 What's Included

The database will be populated with **10 high-quality airdrops**:

### 🔥 High-Potential Upcoming Airdrops
- **zkSync Era** - $500-2000 potential, very high rating
- **StarkNet** - $800-2500 potential, confirmed token
- **Blast** - $300-1200 potential, high rating
- **EigenLayer** - $400-1500 potential, restaking protocol
- **Linea** - $300-1500 potential, ConsenSys backed

### ✅ Successful Past Airdrops
- **Uniswap** - $1200-4000 (historical)
- **Arbitrum One** - $200-800 (distributed)
- **Optimism** - $150-600 (distributed)
- **dYdX** - $800-3000 (distributed)
- **1inch** - $500-1500 (distributed)

## 🗂️ Database Schema

### Tables Created

1. **airdrops** - Main airdrop information
2. **airdrop_sources** - Data source tracking
3. **scraping_logs** - Scraping activity logs
4. **subscriptions** - User notification preferences

### Key Features

- **Row Level Security** enabled
- **Performance indexes** on common queries
- **Automatic timestamps** with triggers
- **Data validation** with constraints
- **Public read access** for airdrops

## 🛠️ Available Scripts

```bash
# Setup database schema and populate with data
npm run setup-db

# Seed database with airdrop data (run after setup)
npm run seed

# Test database connection
npm run test-db

# Collect fresh data from sources
npm run collect-data

# Start data collection scheduler
npm run scheduler
```

## 🔧 Testing the Connection

After setting up credentials, test the connection:

```bash
npm run test-db
```

Expected output:
```
✅ Database connection successful
✅ Airdrops table accessible
📊 Current airdrop count: 10
```

## 🚀 Deployment

After setup, your application will:

1. **Try to connect** to real Supabase database
2. **Fallback to mock data** if database is unavailable
3. **Show comprehensive airdrop listings** with real data
4. **Display proper error messages** if needed

## 📈 Production Ready

The setup includes:

- **Comprehensive data** with 10+ vetted airdrops
- **Proper indexing** for fast queries
- **Security policies** for data access
- **Error handling** for production
- **Fallback systems** for reliability

## 🎯 Next Steps

1. **Set up Supabase project** (5 minutes)
2. **Update environment variables** (2 minutes)
3. **Run setup scripts** (1 minute)
4. **Deploy to production** ✅
5. **Monitor and update** data regularly

## 🆘 Troubleshooting

### Database Connection Issues
- Verify credentials in `.env.local`
- Check Supabase project status
- Ensure proper IP whitelist settings

### Data Not Showing
- Run `npm run seed` to populate data
- Check browser console for errors
- Verify RLS policies in Supabase

### Permission Errors
- Ensure `service_role` key is used for seeding
- Check RLS policies in Supabase dashboard
- Verify API key permissions

---

**🎉 Your airdrop hunter will be production-ready with real data after following these steps!**