import bcryptjs from 'bcryptjs';
import { neon } from '@neondatabase/serverless';

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

    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Direct SQL connection (no schema imports)
    const sql = neon(process.env.DATABASE_URL!);
    
    // Set search path and find user (with schema qualification)
    await sql`SET search_path TO public`;
    
    const users = await sql`
      SELECT id, email, password, first_name, last_name, role, market, created_at 
      FROM public.users WHERE email = ${email}
    `;
    
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];
    if (!user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return user without password
    const { password: _, ...sanitizedUser } = user;
    return res.status(200).json({ 
      message: "Sign in successful", 
      user: sanitizedUser 
    });

  } catch (error) {
    console.error('Signin error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}