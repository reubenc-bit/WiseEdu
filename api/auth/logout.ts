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

    // For serverless functions, we don't have sessions to destroy
    // Just return success for now
    return res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}