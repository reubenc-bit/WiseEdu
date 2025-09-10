import bcrypt from 'bcrypt';

// Import storage
import { storage } from '../../server/storage';

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await storage.getUserByEmail(email);
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