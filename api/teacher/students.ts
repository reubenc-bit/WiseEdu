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

    const { teacherId } = req.query;
    
    if (!teacherId) {
      return res.status(400).json({ message: 'Teacher ID required' });
    }

    const sql = neon(process.env.DATABASE_URL!);
    await sql`SET search_path TO public`;

    // First verify teacher role
    const teachers = await sql`
      SELECT role FROM public.users WHERE id = ${teacherId}
    `;

    if (teachers.length === 0 || teachers[0].role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Get students enrolled in teacher's classes
    const students = await sql`
      SELECT DISTINCT 
        u.id,
        u.email,
        u.first_name,
        u.last_name,
        u.role,
        u.market,
        u.created_at
      FROM public.users u
      JOIN public.class_enrollments ce ON u.id = ce.student_id
      WHERE ce.teacher_id = ${teacherId} AND u.role = 'student'
      ORDER BY u.first_name, u.last_name
    `;

    return res.status(200).json(students);

  } catch (error) {
    console.error('Teacher students error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}