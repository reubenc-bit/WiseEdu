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
    const { email, password, firstName, lastName, role = 'student', market = 'south-africa' } = req.body;
    
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user already exists
    const [existingUser] = await db.select().from(users).where(eq(users.email, email));
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const [user] = await db.insert(users).values({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      market
    }).returning();

    // Return sanitized user data without password
    const { password: _, ...sanitizedUser } = user;
    res.json({ message: "User created successfully", user: sanitizedUser });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}