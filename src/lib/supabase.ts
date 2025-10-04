import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Airdrop {
  id: string;
  name: string;
  description?: string;
  category: string;
  status: 'upcoming' | 'confirmed' | 'distributed' | 'ended';
  blockchain: string;
  token_symbol?: string;
  estimated_value?: string;
  eligibility_criteria?: string[];
  requirements?: string[];
  official_website?: string;
  twitter_handle?: string;
  discord_link?: string;
  telegram_link?: string;
  contract_address?: string;
  distribution_date?: string;
  created_at: string;
  updated_at: string;
  featured: boolean;
  priority: number;
  potential_rating: 'low' | 'medium' | 'high' | 'very_high';
  china_restricted: boolean;
}

export interface AirdropSource {
  id: string;
  name: string;
  url: string;
  type: 'twitter' | 'website' | 'github' | 'forum' | 'rss';
  language: 'english' | 'chinese';
  last_scraped?: string;
  is_active: boolean;
  created_at: string;
}

export interface ScrapingLog {
  id: string;
  source_id: string;
  status: 'success' | 'failed' | 'partial';
  items_found: number;
  error_message?: string;
  scraped_at: string;
}