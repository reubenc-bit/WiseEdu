import bcryptjs from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../lib/db';
import { users } from '../../shared/schema';

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
    const hashedPassword = await bcryptjs.hash(password, 12);

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
    return res.status(200).json({ 
      message: "User created successfully", 
      user: sanitizedUser 
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}