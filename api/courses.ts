import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    const sql = neon(process.env.DATABASE_URL!);
    await sql`SET search_path TO public`;

    if (req.method === 'GET') {
      // Get courses for a market (default to South Africa)
      const { ageGroup, market = 'south-africa' } = req.query;
      
      let query = sql`
        SELECT id, title, description, market, age_group, difficulty, thumbnail_url, is_published, created_at, updated_at
        FROM public.courses 
        WHERE market = ${market} AND is_published = true
      `;
      
      if (ageGroup) {
        query = sql`
          SELECT id, title, description, market, age_group, difficulty, thumbnail_url, is_published, created_at, updated_at
          FROM public.courses 
          WHERE market = ${market} AND is_published = true AND age_group = ${ageGroup}
        `;
      }
      
      const courses = await query;
      return res.status(200).json(courses);
      
    } else if (req.method === 'POST') {
      // Create new course (admin only - simplified for serverless)
      const { title, description, market = 'south-africa', ageGroup, difficulty, thumbnailUrl } = req.body;
      
      if (!title || !ageGroup || !difficulty) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const [course] = await sql`
        INSERT INTO public.courses (title, description, market, age_group, difficulty, thumbnail_url, is_published)
        VALUES (${title}, ${description}, ${market}, ${ageGroup}, ${difficulty}, ${thumbnailUrl}, false)
        RETURNING *
      `;
      
      return res.status(201).json(course);
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('Courses error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}