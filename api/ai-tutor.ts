import { generateAITutorResponse } from '../server/lib/openai';

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

    const { message, isLittleCoder = false, tutorMode = 'chat', context } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

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