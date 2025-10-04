import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test basic functionality
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      memory: process.memoryUsage(),
      features: {
        database: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        scraping: !!process.env.SCRAPER_API_KEY,
      }
    }

    return NextResponse.json(health)
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}