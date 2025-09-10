export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Test basic function execution
    const result = {
      timestamp: new Date().toISOString(),
      method: req.method,
      hasDbUrl: !!process.env.DATABASE_URL,
      nodeVersion: process.version,
      platform: process.platform,
      dbUrlLength: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0,
      environment: process.env.NODE_ENV || 'unknown'
    };

    console.log('Test endpoint called:', result);
    
    return res.status(200).json({
      message: 'API function is working',
      debug: result
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return res.status(500).json({ 
      message: 'Test failed', 
      error: error instanceof Error ? error.message : String(error)
    });
  }
}