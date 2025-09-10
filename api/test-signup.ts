import bcryptjs from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from './lib/db';
import { users } from '../shared/schema';

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

    // Test database connection and uuid generation
    const testEmail = `test-${Date.now()}@example.com`;
    
    // Try to create a test user
    const hashedPassword = await bcryptjs.hash('testpassword', 12);
    
    const [user] = await db.insert(users).values({
      email: testEmail,
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'User',
      role: 'student',
      market: 'south-africa'
    }).returning();

    // Clean up - delete the test user
    await db.delete(users).where(eq(users.email, testEmail));

    return res.status(200).json({ 
      message: "Database test successful!", 
      testUserId: user.id,
      pgcryptoWorking: true
    });

  } catch (error) {
    console.error('Test error:', error);
    return res.status(500).json({ 
      message: "Database test failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}