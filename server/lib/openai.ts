import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface AITutorResponse {
  message: string;
  suggestion?: {
    type: 'explain' | 'practice' | 'fix' | 'project';
    title: string;
    description: string;
    code?: string;
  };
}

export async function generateAITutorResponse(
  userMessage: string,
  isLittleCoder: boolean = false,
  tutorMode: 'chat' | 'code-review' | 'practice' = 'chat',
  context?: string
): Promise<AITutorResponse> {
  try {
    const systemPrompt = isLittleCoder 
      ? `You are a friendly AI coding buddy for children aged 6-11. Use simple language, fun analogies, and encouraging words. Make coding concepts easy to understand with relatable examples. Always be enthusiastic and supportive. Keep responses brief and engaging.`
      : `You are an expert programming tutor for students aged 12-17. Provide clear, educational explanations with practical examples. Focus on building understanding of programming concepts, debugging skills, and best practices. Be encouraging but also provide technical depth when appropriate.`;

    const modeContext = tutorMode === 'code-review' 
      ? 'Focus on reviewing code for errors, improvements, and best practices.'
      : tutorMode === 'practice'
      ? 'Provide practice exercises and hands-on challenges.'
      : 'Engage in helpful programming conversation and answer questions.';

    const prompt = `${systemPrompt}\n\n${modeContext}\n\n${context ? `Context: ${context}\n\n` : ''}Student question: ${userMessage}

Please respond with helpful guidance and optionally suggest a follow-up activity. Keep responses concise but informative.`;

    // Try GPT-5 first, fallback to GPT-4o if not available
    let model = "gpt-5"; // the newest OpenAI model is "gpt-5" which was released August 7, 2025
    let response;
    
    try {
      response = await openai.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400,
        temperature: 0.7,
      });
    } catch (modelError: any) {
      // If GPT-5 is not available, fallback to GPT-4o
      if (modelError.status === 404 || modelError.message?.includes('model')) {
        console.log('GPT-5 not available, falling back to GPT-4o');
        model = "gpt-4o";
        response = await openai.chat.completions.create({
          model,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 400,
          temperature: 0.7,
        });
      } else {
        throw modelError;
      }
    }

    const aiMessage = response.choices[0].message.content || "I'm here to help with your coding questions!";

    // Generate suggestion based on message content
    let suggestion;
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('error') || lowercaseMessage.includes('bug') || lowercaseMessage.includes('not working')) {
      suggestion = {
        type: 'fix' as const,
        title: 'Debug Together',
        description: "Let's identify and fix the issue step by step",
        code: '// Share your code here and I\'ll help you debug it'
      };
    } else if (lowercaseMessage.includes('learn') || lowercaseMessage.includes('how to')) {
      suggestion = {
        type: 'practice' as const,
        title: 'Try It Out',
        description: 'Practice what you just learned',
        code: isLittleCoder 
          ? 'print("Hello, World!")\n# Try changing this message!'
          : 'function practice() {\n  // Write your code here\n  console.log("Practice time!");\n}'
      };
    }

    return {
      message: aiMessage,
      suggestion
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // More specific error handling
    let fallbackResponse;
    if (error instanceof Error && error.message.includes('insufficient_quota')) {
      fallbackResponse = isLittleCoder
        ? "I'm taking a little break right now! But I still want to help you learn coding. Can you try asking me again in a few minutes?"
        : "I'm currently experiencing high usage and need to take a brief pause. Please try your question again in a few minutes, and I'll be happy to help with your coding challenge!";
    } else {
      fallbackResponse = isLittleCoder
        ? "Oops! I'm having trouble thinking right now. Can you ask me again? I love helping with coding!"
        : "I'm experiencing some technical difficulties right now. Please try your question again, and I'll do my best to help you with your coding challenge.";
    }
    
    return { message: fallbackResponse };
  }
}