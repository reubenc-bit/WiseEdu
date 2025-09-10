export default async function handler(req: any, res: any) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    return res.status(200).json({ 
      message: "Health check passed", 
      timestamp: new Date().toISOString(),
      runtime: "nodejs20.x",
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV
      }
    });

  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({ 
      message: "Health check failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}