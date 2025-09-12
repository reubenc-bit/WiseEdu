import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';

export default async function handler(req: any, res: any) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Only allow GET
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    // Check for JWT token in Authorization header or cookie
    let token = null;
    
    // First try Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    }
    
    // If no header token, try cookie
    if (!token && req.headers.cookie) {
      const cookies = req.headers.cookie.split(';');
      const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
      if (authCookie) {
        token = authCookie.split('=')[1];
      }
    }

    // If no token found, return null (not authenticated)
    if (!token) {
      return res.status(200).json(null);
    }

    // Verify JWT token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as any;
      
      // Get user data from database to ensure it's still valid
      const sql = neon(process.env.DATABASE_URL!);
      await sql`SET search_path TO public`;

      const users = await sql`
        SELECT id, email, first_name, last_name, role, market, created_at, updated_at
        FROM public.users 
        WHERE id = ${decoded.userId}
      `;

      if (users.length === 0) {
        return res.status(200).json(null);
      }

      return res.status(200).json(users[0]);

    } catch (jwtError) {
      // Invalid token
      return res.status(200).json(null);
    }

  } catch (error) {
    console.error('Auth user error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}