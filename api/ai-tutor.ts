import { generateAITutorResponse } from '../server/lib/openai';

export default async function handler(req: any, res: any) {
  try {
    // Restrict CORS to same origin only for security
    const origin = req.headers.origin;
    const allowedOrigins = [
      'https://wise-edu-three.vercel.app',
      'https://codewisehub.com', // Add your production domain
      'http://localhost:5000' // Development only
    ];
    
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Handle preflight
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { message, isLittleCoder = false, tutorMode = 'chat', context } = req.body;

    // Enhanced input validation
    if (!message?.trim() || message.length > 1000) {
      return res.status(400).json({ message: 'Message is required and must be less than 1000 characters' });
    }

    if (!['chat', 'code-review', 'practice'].includes(tutorMode)) {
      return res.status(400).json({ message: 'Invalid tutor mode' });
    }

    // TODO: Add authentication check for serverless function
    // For now, this endpoint should only be used in development

    // Generate AI response using OpenAI
    const aiResponse = await generateAITutorResponse(message, isLittleCoder, tutorMode, context);

    return res.status(200).json({
      success: true,
      response: aiResponse
    });

  } catch (error) {
    console.error('AI Tutor API Error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}