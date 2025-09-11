import { neon } from '@neondatabase/serverless';

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

    // Only allow GET
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID required' });
    }

    const sql = neon(process.env.DATABASE_URL!);
    await sql`SET search_path TO public`;

    const achievements = await sql`
      SELECT 
        ua.id,
        ua.user_id,
        ua.achievement_id,
        ua.earned_date,
        a.title,
        a.description,
        a.icon_url,
        a.criteria
      FROM public.user_achievements ua
      JOIN public.achievements a ON ua.achievement_id = a.id
      WHERE ua.user_id = ${userId}
      ORDER BY ua.earned_date DESC
    `;

    return res.status(200).json(achievements);

  } catch (error) {
    console.error('Achievements error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}