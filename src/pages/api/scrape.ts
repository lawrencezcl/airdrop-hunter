import type { NextApiRequest, NextApiResponse } from 'next';
import AirdropScraper from '../../lib/scraper';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple authentication check (in production, use proper auth)
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.SCRAPER_API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const scraper = new AirdropScraper();

    // Initialize sources if needed
    await scraper.initializeSources();

    // Run scraping
    await scraper.scrapeAllSources();

    res.status(200).json({
      success: true,
      message: 'Scraping completed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({
      error: 'Scraping failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}