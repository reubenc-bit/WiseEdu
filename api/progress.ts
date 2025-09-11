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
      // Get user progress - simplified for serverless (no auth validation)
      const { userId, courseId } = req.query;
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID required' });
      }

      let query;
      if (courseId) {
        query = sql`
          SELECT id, user_id, lesson_id, course_id, completed, completion_date, time_spent, created_at, updated_at
          FROM public.user_progress 
          WHERE user_id = ${userId} AND course_id = ${courseId}
        `;
      } else {
        query = sql`
          SELECT id, user_id, lesson_id, course_id, completed, completion_date, time_spent, created_at, updated_at
          FROM public.user_progress 
          WHERE user_id = ${userId}
        `;
      }
      
      const progress = await query;
      return res.status(200).json(progress);
      
    } else if (req.method === 'POST') {
      // Update user progress
      const { userId, lessonId, courseId, completed, timeSpent } = req.body;
      
      if (!userId || !lessonId || !courseId) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const [progress] = await sql`
        INSERT INTO public.user_progress (user_id, lesson_id, course_id, completed, completion_date, time_spent)
        VALUES (${userId}, ${lessonId}, ${courseId}, ${completed || false}, 
                ${completed ? new Date().toISOString() : null}, ${timeSpent || 0})
        ON CONFLICT (user_id, lesson_id) 
        DO UPDATE SET 
          completed = EXCLUDED.completed,
          completion_date = EXCLUDED.completion_date,
          time_spent = EXCLUDED.time_spent,
          updated_at = NOW()
        RETURNING *
      `;
      
      return res.status(200).json(progress);
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('Progress error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}