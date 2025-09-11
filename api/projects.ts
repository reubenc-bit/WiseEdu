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
      // Get user projects - simplified for serverless (no auth validation)
      const { userId } = req.query;
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID required' });
      }

      const projects = await sql`
        SELECT id, user_id, title, description, code_content, language, is_public, created_at, updated_at
        FROM public.projects 
        WHERE user_id = ${userId}
        ORDER BY updated_at DESC
      `;
      
      return res.status(200).json(projects);
      
    } else if (req.method === 'POST') {
      // Create new project
      const { userId, title, description, codeContent, language, isPublic } = req.body;
      
      if (!userId || !title) {
        return res.status(400).json({ message: 'User ID and title are required' });
      }

      const [project] = await sql`
        INSERT INTO public.projects (user_id, title, description, code_content, language, is_public)
        VALUES (${userId}, ${title}, ${description}, ${codeContent}, ${language || 'javascript'}, ${isPublic || false})
        RETURNING *
      `;
      
      return res.status(201).json(project);
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('Projects error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}