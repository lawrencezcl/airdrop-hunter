-- Airdrops table
CREATE TABLE airdrops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'Layer 2', 'DeFi', 'Gaming', 'Infrastructure', 'Social'
  status TEXT NOT NULL DEFAULT 'upcoming', -- 'upcoming', 'confirmed', 'distributed', 'ended'
  blockchain TEXT NOT NULL,
  token_symbol TEXT,
  estimated_value TEXT,
  eligibility_criteria TEXT[],
  requirements TEXT[],
  official_website TEXT,
  twitter_handle TEXT,
  discord_link TEXT,
  telegram_link TEXT,
  contract_address TEXT,
  distribution_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE,
  priority INTEGER DEFAULT 0, -- 0-10, higher = more important
  potential_rating TEXT CHECK (potential_rating IN ('low', 'medium', 'high', 'very_high')),
  china_restricted BOOLEAN DEFAULT FALSE
);

-- Airdrop sources for tracking where we got the information
CREATE TABLE airdrop_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL, -- 'twitter', 'website', 'github', 'forum', 'rss'
  language TEXT DEFAULT 'english', -- 'english', 'chinese'
  last_scraped TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Scraping logs to track data collection
CREATE TABLE scraping_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_id UUID REFERENCES airdrop_sources(id),
  status TEXT NOT NULL, -- 'success', 'failed', 'partial'
  items_found INTEGER DEFAULT 0,
  error_message TEXT,
  scraped_at TIMESTAMP DEFAULT NOW()
);

-- User subscriptions for notifications
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE,
  wallet_address TEXT,
  preferences JSONB DEFAULT '{}', -- categories, blockchains, etc.
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_airdrops_status ON airdrops(status);
CREATE INDEX idx_airdrops_category ON airdrops(category);
CREATE INDEX idx_airdrops_blockchain ON airdrops(blockchain);
CREATE INDEX idx_airdrops_priority ON airdrops(priority DESC);
CREATE INDEX idx_airdrops_featured ON airdrops(featured);
CREATE INDEX idx_scraping_logs_source_id ON scraping_logs(source_id);
CREATE INDEX idx_scraping_logs_scraped_at ON scraping_logs(scraped_at);

-- Enable Row Level Security
ALTER TABLE airdrops ENABLE ROW LEVEL SECURITY;
ALTER TABLE airdrop_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraping_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access to airdrops
CREATE POLICY "Enable read access for all users" ON airdrops
  FOR SELECT USING (true);

-- Allow public read access to airdrop sources
CREATE POLICY "Enable read access for all users" ON airdrop_sources
  FOR SELECT USING (true);

-- Allow insertions for authenticated users (for subscriptions)
CREATE POLICY "Enable insert for authenticated users" ON subscriptions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to manage their own subscriptions
CREATE POLICY "Enable users to manage their subscriptions" ON subscriptions
  FOR ALL USING (auth.uid() = id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_airdrops_updated_at BEFORE UPDATE ON airdrops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();