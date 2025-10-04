import type { NextApiRequest, NextApiResponse } from 'next';
import AirdropScraper from '../../../lib/scraper';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify cron job request (in production, use proper authentication)
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Starting scheduled scraping job...');

    const scraper = new AirdropScraper();
    await scraper.initializeSources();
    await scraper.scrapeAllSources();

    console.log('Scheduled scraping completed successfully');

    res.status(200).json({
      success: true,
      message: 'Scheduled scraping completed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Scheduled scraping error:', error);
    res.status(500).json({
      error: 'Scheduled scraping failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}