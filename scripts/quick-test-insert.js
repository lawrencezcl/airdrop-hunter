#!/usr/bin/env node

/**
 * Quick test to insert data directly
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function quickTest() {
  console.log('🔬 Quick Database Test');
  console.log('======================');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Try to create a simple test airdrop
    const testAirdrop = {
      name: 'Test Airdrop Quick',
      description: 'Test airdrop to verify database connection',
      category: 'Layer 2',
      status: 'upcoming',
      blockchain: 'Ethereum',
      token_symbol: 'TEST',
      estimated_value: '$100-500',
      eligibility_criteria: ['Test requirement'],
      requirements: ['Test'],
      official_website: 'https://test.com',
      featured: true,
      priority: 10,
      potential_rating: 'very_high',
      china_restricted: false
    };

    console.log('📝 Attempting to insert test airdrop...');
    const { data, error } = await supabase.from('airdrops').insert(testAirdrop).select();

    if (error) {
      console.log('❌ Insert failed:', error.message);

      if (error.message.includes('relation "airdrops" does not exist')) {
        console.log('');
        console.log('📋 The "airdrops" table does not exist. Please create it:');
        console.log('   1. Go to https://supabase.com/dashboard/project/gphxrmkibuythbcopkmo');
        console.log('   2. Click "SQL Editor" in the left sidebar');
        console.log('   3. Copy and paste this SQL:');
        console.log('      CREATE TABLE airdrops (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, name TEXT NOT NULL, description TEXT, category TEXT NOT NULL, status TEXT NOT NULL DEFAULT \'upcoming\', blockchain TEXT NOT NULL DEFAULT \'Ethereum\', token_symbol TEXT, estimated_value TEXT, eligibility_criteria TEXT[], requirements TEXT[], official_website TEXT, twitter_handle TEXT, discord_link TEXT, telegram_link TEXT, contract_address TEXT, distribution_date TIMESTAMP, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW(), featured BOOLEAN DEFAULT FALSE, priority INTEGER DEFAULT 0, potential_rating TEXT DEFAULT \'medium\', china_restricted BOOLEAN DEFAULT FALSE);');
        console.log('   4. Click "Run"');
        console.log('   5. Then run: node scripts/quick-test-insert.js');
      }
    } else {
      console.log('✅ Success! Test airdrop inserted:', data);
    }

    // Test select
    console.log('');
    console.log('🔍 Testing select...');
    const { data: selectData, error: selectError } = await supabase.from('airdrops').select('*').limit(3);

    if (selectError) {
      console.log('❌ Select failed:', selectError.message);
    } else {
      console.log('✅ Select successful!');
      console.log('📊 Current airdrops in database:');
      selectData.forEach((item, i) => {
        console.log(`   ${i+1}. ${item.name} (${item.status}) - ${item.estimated_value}`);
      });
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

quickTest();