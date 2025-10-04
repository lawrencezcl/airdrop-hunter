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

-- Insert comprehensive airdrop data
INSERT INTO airdrops (name, description, category, status, blockchain, token_symbol, estimated_value, eligibility_criteria, requirements, official_website, twitter_handle, discord_link, telegram_link, contract_address, distribution_date, featured, priority, potential_rating, china_restricted) VALUES ('zkSync Era', 'Layer 2 scaling solution using ZK-rollups technology with mainnet active and token expected', 'Layer 2', 'upcoming', 'Ethereum', 'ZK', '$500-2000', ARRAY['Bridge funds to zkSync Era', 'Use various dApps in the ecosystem', 'Maintain minimum balance', 'Regular interactions over 3+ months'], ARRAY['Bridge funds', 'Use dApps', 'Maintain balance'], 'https://zksync.io/', '@zksync', 'https://discord.gg/zksync', NULL, NULL, NULL, TRUE, 10, 'very_high', FALSE);
INSERT INTO airdrops (name, description, category, status, blockchain, token_symbol, estimated_value, eligibility_criteria, requirements, official_website, twitter_handle, discord_link, telegram_link, contract_address, distribution_date, featured, priority, potential_rating, china_restricted) VALUES ('StarkNet', 'ZK-rollup Layer 2 network using STARK proofs with Cairo smart contracts', 'Layer 2', 'confirmed', 'Ethereum', 'STRK', '$800-2500', ARRAY['Deploy contracts', 'Use dApps', 'Maintain activity'], ARRAY['Testnet participation', 'Mainnet usage', 'Contract deployment'], 'https://starknet.io/', '@starknet', 'https://discord.gg/starknet', NULL, NULL, NULL, TRUE, 9, 'very_high', FALSE);
INSERT INTO airdrops (name, description, category, status, blockchain, token_symbol, estimated_value, eligibility_criteria, requirements, official_website, twitter_handle, discord_link, telegram_link, contract_address, distribution_date, featured, priority, potential_rating, china_restricted) VALUES ('Blast', 'Ethereum L2 with native yield for ETH and stablecoins', 'Layer 2', 'upcoming', 'Ethereum', 'BLAST', '$300-1200', ARRAY['Bridge assets', 'Use dApps', 'Refer friends'], ARRAY['Bridge ETH/stablecoins', 'Use Blast dApps', 'Maintain activity'], 'https://blast.io/', '@blast_official', 'https://discord.gg/blast', NULL, NULL, NULL, TRUE, 8, 'high', FALSE);
INSERT INTO airdrops (name, description, category, status, blockchain, token_symbol, estimated_value, eligibility_criteria, requirements, official_website, twitter_handle, discord_link, telegram_link, contract_address, distribution_date, featured, priority, potential_rating, china_restricted) VALUES ('EigenLayer', 'Restaking protocol for Ethereum allowing ETH staking on multiple protocols', 'DeFi', 'upcoming', 'Ethereum', 'EIGEN', '$400-1500', ARRAY['Stake ETH', 'Restake with protocols', 'Maintain position'], ARRAY['ETH staking', 'Restake with AVSs', 'Maintain activity'], 'https://www.eigenlayer.xyz/', '@eigenlayer', 'https://discord.gg/eigenlayer', NULL, NULL, NULL, TRUE, 9, 'very_high', FALSE);
INSERT INTO airdrops (name, description, category, status, blockchain, token_symbol, estimated_value, eligibility_criteria, requirements, official_website, twitter_handle, discord_link, telegram_link, contract_address, distribution_date, featured, priority, potential_rating, china_restricted) VALUES ('Linea', 'ConsenSys Layer 2 solution with Type 2 ZK-EVM', 'Layer 2', 'upcoming', 'Ethereum', 'LINEA', '$300-1500', ARRAY['Bridge assets via official bridge', 'Use Linea dApps', 'Maintain activity'], ARRAY['Bridge assets', 'Use ecosystem dApps'], 'https://linea.build/', '@LineaBuild', 'https://discord.gg/linea', NULL, NULL, NULL, TRUE, 8, 'high', FALSE);
