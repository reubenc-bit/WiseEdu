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

    // Get teacher certifications
    const certifications = await sql`
      SELECT 
        id,
        teacher_id,
        certification_name,
        issuing_organization,
        issue_date,
        expiry_date,
        certificate_url,
        status,
        created_at,
        updated_at
      FROM public.teacher_certifications
      WHERE teacher_id = ${teacherId}
      ORDER BY issue_date DESC
    `;

    return res.status(200).json(certifications);

  } catch (error) {
    console.error('Teacher certifications error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}