import AirdropScraper from '../lib/scraper';
import EnhancedAirdropScraper from '../lib/enhanced-scraper';
import cron from 'node-cron';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

class DataCollectionScheduler {
  private scraper: AirdropScraper;
  private enhancedScraper: EnhancedAirdropScraper;

  constructor() {
    this.scraper = new AirdropScraper();
    this.enhancedScraper = new EnhancedAirdropScraper();
  }

  async start() {
    console.log('🚀 Starting Airdrop Hunter Data Collection Scheduler...');

    // Initialize scraper sources
    try {
      await this.scraper.initializeSources();
      await this.enhancedScraper.initialize();
      console.log('✅ Both scrapers initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize scraper sources:', error);
    }

    // Schedule data collection tasks
    await this.scheduleTasks();
  }

  private async scheduleTasks() {
    // Run comprehensive scraping every 6 hours
    cron.schedule('0 */6 * * *', async () => {
      console.log('🔄 Running comprehensive scraping...');
      await this.runComprehensiveScraping();
    });

    // Run enhanced scraping every 8 hours
    cron.schedule('0 */8 * * *', async () => {
      console.log('🚀 Running enhanced scraping with X.com and websites...');
      await this.runEnhancedScraping();
    });

    // Run quick check every 2 hours
    cron.schedule('0 */2 * * *', async () => {
      console.log('🔍 Running quick data check...');
      await this.runQuickCheck();
    });

    // Update featured airdrops daily
    cron.schedule('0 0 * * *', async () => {
      console.log('⭐ Updating featured airdrops...');
      await this.updateFeaturedAirdrops();
    });

    // Clean up old logs weekly
    cron.schedule('0 0 * * 0', async () => {
      console.log('🧹 Cleaning up old logs...');
      await this.cleanupOldLogs();
    });

    console.log('✅ All scheduled tasks configured:');
    console.log('   - Comprehensive scraping: Every 6 hours');
    console.log('   - Enhanced scraping (X.com + websites): Every 8 hours');
    console.log('   - Quick data check: Every 2 hours');
    console.log('   - Featured airdrops update: Daily');
    console.log('   - Log cleanup: Weekly');

    // Run initial scraping
    console.log('🚀 Running initial data collection...');
    await this.runComprehensiveScraping();

    // Run initial enhanced scraping
    console.log('🚀 Running initial enhanced data collection...');
    await this.runEnhancedScraping();
  }

  private async runComprehensiveScraping() {
    const startTime = new Date();
    console.log(`🕒 Starting comprehensive scraping at ${startTime.toISOString()}`);

    try {
      await this.scraper.scrapeAllSources();

      const endTime = new Date();
      const duration = (endTime.getTime() - startTime.getTime()) / 1000;
      console.log(`✅ Comprehensive scraping completed in ${duration}s`);

      // Log completion
      await this.logScheduleCompletion('comprehensive_scraping', 'success', duration);
    } catch (error) {
      console.error('❌ Comprehensive scraping failed:', error);
      await this.logScheduleCompletion('comprehensive_scraping', 'failed', 0, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async runQuickCheck() {
    const startTime = new Date();
    console.log(`🕒 Starting quick data check at ${startTime.toISOString()}`);

    try {
      // Check for urgent updates or high-priority airdrops
      const { data: urgentAirdrops, error } = await supabase
        .from('airdrops')
        .select('*')
        .eq('status', 'upcoming')
        .gte('priority', 8)
        .order('priority', { ascending: false })
        .limit(10);

      if (error) {
        throw error;
      }

      console.log(`✅ Quick check completed. Found ${urgentAirdrops?.length || 0} high-priority upcoming airdrops`);

      const endTime = new Date();
      const duration = (endTime.getTime() - startTime.getTime()) / 1000;
      await this.logScheduleCompletion('quick_check', 'success', duration);

    } catch (error) {
      console.error('❌ Quick check failed:', error);
      await this.logScheduleCompletion('quick_check', 'failed', 0, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async updateFeaturedAirdrops() {
    const startTime = new Date();
    console.log(`🕒 Starting featured airdrops update at ${startTime.toISOString()}`);

    try {
      // Update featured status based on priority and recency
      const { data: highPriorityAirdrops, error: selectError } = await supabase
        .from('airdrops')
        .select('*')
        .or('priority.gte.8,status.eq.upcoming')
        .order('priority', { ascending: false })
        .limit(20);

      if (selectError) {
        throw selectError;
      }

      // Update featured status
      const updates = highPriorityAirdrops?.map((airdrop, index) => ({
        id: airdrop.id,
        featured: index < 10 // Top 10 get featured status
      })) || [];

      for (const update of updates) {
        const { error: updateError } = await supabase
          .from('airdrops')
          .update({ featured: update.featured })
          .eq('id', update.id);

        if (updateError) {
          console.error(`Failed to update featured status for ${update.id}:`, updateError);
        }
      }

      console.log(`✅ Featured airdrops updated. ${updates.filter(u => u.featured).length} airdrops now featured`);

      const endTime = new Date();
      const duration = (endTime.getTime() - startTime.getTime()) / 1000;
      await this.logScheduleCompletion('featured_update', 'success', duration);

    } catch (error) {
      console.error('❌ Featured airdrops update failed:', error);
      await this.logScheduleCompletion('featured_update', 'failed', 0, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async cleanupOldLogs() {
    const startTime = new Date();
    console.log(`🕒 Starting log cleanup at ${startTime.toISOString()}`);

    try {
      // Delete scraping logs older than 30 days
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30);

      const { error: deleteError } = await supabase
        .from('scraping_logs')
        .delete()
        .lt('scraped_at', cutoffDate.toISOString());

      if (deleteError) {
        throw deleteError;
      }

      console.log('✅ Old scraping logs cleaned up');

      const endTime = new Date();
      const duration = (endTime.getTime() - startTime.getTime()) / 1000;
      await this.logScheduleCompletion('log_cleanup', 'success', duration);

    } catch (error) {
      console.error('❌ Log cleanup failed:', error);
      await this.logScheduleCompletion('log_cleanup', 'failed', 0, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async logScheduleCompletion(taskType: string, status: string, duration: number, errorMessage?: string) {
    try {
      await supabase
        .from('scraping_logs')
        .insert({
          source_id: taskType,
          status: status,
          items_found: duration > 0 ? 1 : 0,
          error_message: errorMessage
        });
    } catch (error) {
      console.error('Failed to log schedule completion:', error);
    }
  }

  private async runEnhancedScraping() {
    const startTime = new Date();
    console.log(`🕒 Starting enhanced scraping at ${startTime.toISOString()}`);

    try {
      const airdrops = await this.enhancedScraper.scrapeAllSources();
      const result = await this.enhancedScraper.saveAirdrops(airdrops);

      const endTime = new Date();
      const duration = (endTime.getTime() - startTime.getTime()) / 1000;

      console.log(`✅ Enhanced scraping completed in ${duration}s`);
      console.log(`📊 Results: ${result.success} saved, ${result.duplicates} duplicates, ${result.errors} errors`);

      await this.logScheduleCompletion('enhanced_scraping', 'success', duration);

    } catch (error) {
      console.error('❌ Enhanced scraping failed:', error);
      await this.logScheduleCompletion('enhanced_scraping', 'failed', 0, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  stop() {
    console.log('🛑 Stopping Airdrop Hunter Data Collection Scheduler...');
    process.exit(0);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Start the scheduler
const scheduler = new DataCollectionScheduler();
scheduler.start().catch(console.error);

export default DataCollectionScheduler;