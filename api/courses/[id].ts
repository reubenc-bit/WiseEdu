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

    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'Course ID required' });
    }

    const sql = neon(process.env.DATABASE_URL!);
    await sql`SET search_path TO public`;

    const courses = await sql`
      SELECT id, title, description, market, age_group, difficulty, thumbnail_url, is_published, created_at, updated_at
      FROM public.courses 
      WHERE id = ${id}
    `;

    if (courses.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json(courses[0]);

  } catch (error) {
    console.error('Course error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}