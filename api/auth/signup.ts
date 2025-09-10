// Minimal version for debugging
export default async function handler(req: any, res: any) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    // For now, just return success to test basic function
    return res.status(200).json({ 
      message: 'Signup endpoint reached successfully',
      debug: {
        hasDbUrl: !!process.env.DATABASE_URL,
        method: req.method,
        bodyExists: !!req.body
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}