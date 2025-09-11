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

    const { parentId } = req.query;
    
    if (!parentId) {
      return res.status(400).json({ message: 'Parent ID required' });
    }

    const sql = neon(process.env.DATABASE_URL!);
    await sql`SET search_path TO public`;

    // First verify parent role
    const parents = await sql`
      SELECT role FROM public.users WHERE id = ${parentId}
    `;

    if (parents.length === 0 || parents[0].role !== 'parent') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Get children linked to this parent
    const children = await sql`
      SELECT 
        u.id,
        u.email,
        u.first_name,
        u.last_name,
        u.role,
        u.market,
        u.created_at,
        pcr.relationship_type
      FROM public.users u
      JOIN public.parent_child_relationships pcr ON u.id = pcr.child_id
      WHERE pcr.parent_id = ${parentId}
      ORDER BY u.first_name, u.last_name
    `;

    return res.status(200).json(children);

  } catch (error) {
    console.error('Parent children error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}