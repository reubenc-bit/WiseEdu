import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db } from '../lib/db';
import { users } from '../../shared/schema';

export default async function handler(req: any, res: any) {
  // Set CORS headers for Vercel
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

  try {
    // Log for debugging
    console.log('Environment check:', {
      hasDbUrl: !!process.env.DATABASE_URL,
      nodeEnv: process.env.NODE_ENV,
      body: req.body
    });
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return sanitized user data without password
    const { password: _, ...sanitizedUser } = user;
    res.json({ message: "Sign in successful", user: sanitizedUser });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}