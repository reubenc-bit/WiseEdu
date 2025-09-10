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

    const { email, password, firstName, lastName, role = 'student', market = 'south-africa' } = req.body;
    
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Direct SQL without Drizzle imports
    const sql = neon(process.env.DATABASE_URL!);
    
    // Check if user exists
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 12);

    // Insert user
    const newUsers = await sql`
      INSERT INTO users (email, password, first_name, last_name, role, market)
      VALUES (${email}, ${hashedPassword}, ${firstName}, ${lastName}, ${role}::user_role, ${market}::market)
      RETURNING id, email, first_name, last_name, role, market, created_at
    `;

    const user = newUsers[0];
    return res.status(200).json({ 
      message: "User created successfully", 
      user: user
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}