import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Bot, Star, Bug, RotateCcw, Sparkles, Package, Baby, Users, MessageSquare, Search, Dumbbell, Lightbulb } from 'lucide-react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  codeSnippet?: string;
  suggestion?: {
    type: 'explain' | 'practice' | 'fix' | 'project';
    title: string;
    description: string;
    code?: string;
  };
}

interface LearningContext {
  currentTopic?: string;
  strugglingWith?: string[];
  strengths?: string[];
  lastCode?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export function AITutorModal({ isOpen, onClose }: AITutorModalProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [learningContext, setLearningContext] = useState<LearningContext>({});
  const [tutorMode, setTutorMode] = useState<'chat' | 'code-review' | 'practice'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // TODO: Implement proper age group determination
  // For now, defaulting to older students (12-17) as a reasonable fallback
  const ageGroup: '6-11' | '12-17' = '12-17';
  const isLittleCoder = ageGroup === '6-11';

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeTutor();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeTutor = () => {
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: isLittleCoder
        ? "Hi there! I'm your AI coding buddy! I'm here to help you learn programming in a fun way. What would you like to explore today? You can ask me about coding concepts, show me your code, or let's practice together!"
        : "Hello! I'm your AI programming tutor. I'm here to provide personalized coding guidance, review your code, explain complex concepts, and help you overcome programming challenges. What would you like to work on today?",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const generateAIResponse = async (userMessage: string): Promise<ChatMessage> => {
    try {
      // Call the real AI tutor API
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          isLittleCoder,
          tutorMode,
          context: JSON.stringify(learningContext)
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          id: Date.now().toString(),
          role: 'assistant',
          content: data.response.message,
          timestamp: new Date(),
          suggestion: data.response.suggestion
        };
      } else {
        throw new Error('AI tutor service unavailable');
      }
    } catch (error) {
      console.error('AI Tutor Error:', error);
      // Fallback to basic response
      return {
        id: Date.now().toString(),
        role: 'assistant', 
        content: isLittleCoder 
          ? "I'm having trouble right now, but I still want to help! Can you try asking again?"
          : "I'm experiencing some technical difficulties. Please try again, and I'll help you with your coding question.",
        timestamp: new Date()
      };
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);

      // Update learning context based on conversation
      setLearningContext(prev => ({
        ...prev,
        currentTopic: extractTopic(input),
        lastCode: extractCode(input)
      }));
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'm having trouble right now. Please try again in a moment!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const extractTopic = (message: string): string => {
    const topics = ['loops', 'functions', 'variables', 'arrays', 'objects', 'classes'];
    return topics.find(topic => message.toLowerCase().includes(topic)) || 'general';
  };

  const extractCode = (message: string): string | undefined => {
    const codePattern = /```[\s\S]*?```|`[^`]+`/;
    const match = message.match(codePattern);
    return match ? match[0] : undefined;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const switchMode = (mode: 'chat' | 'code-review' | 'practice') => {
    setTutorMode(mode);
    const modeMessages = {
      'code-review': "Great! I'm ready to review your code. Paste your code below and I'll provide detailed feedback, suggestions for improvement, and explain any issues I find.",
      'practice': "Perfect! Let's practice together. I'll give you coding challenges that match your skill level. What topic would you like to practice? Loops, functions, arrays, or something else?",
      'chat': "I'm here to chat and answer any programming questions you have! What would you like to learn about?"
    };

    const modeMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: modeMessages[mode],
      timestamp: new Date()
    };
    setMessages(prev => [...prev, modeMessage]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" data-testid="modal-ai-tutor">
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div>
            <h2 className="text-2xl font-bold flex items-center" data-testid="text-ai-tutor-title">
              <Bot className="w-6 h-6 mr-2" />AI Programming Tutor
            </h2>
            <p className="text-purple-100 text-sm">
              {isLittleCoder ? "Your friendly coding buddy!" : "Personal AI mentor for programming"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition"
            data-testid="button-close-ai-tutor"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex border-b bg-gray-50">
          {['chat', 'code-review', 'practice'].map((mode) => (
            <button
              key={mode}
              onClick={() => switchMode(mode as 'chat' | 'code-review' | 'practice')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition ${
                tutorMode === mode
                  ? 'bg-white text-purple-600 border-b-2 border-purple-500'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-100'
              }`}
              data-testid={`button-mode-${mode}`}
            >
{mode === 'chat' && <MessageSquare className="w-4 h-4 mr-1" />} 
              {mode === 'code-review' && <Search className="w-4 h-4 mr-1" />} 
              {mode === 'practice' && <Dumbbell className="w-4 h-4 mr-1" />}
              {mode.charAt(0).toUpperCase() + mode.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="container-chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              data-testid={`message-${message.role}-${message.id}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.suggestion && (
                  <div className="mt-3 p-3 bg-white bg-opacity-20 rounded-lg border" data-testid="message-suggestion">
                    <div className="font-semibold text-sm mb-1 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-1" />
                      {message.suggestion.title}
                    </div>
                    <div className="text-sm opacity-90 mb-2">{message.suggestion.description}</div>
                    {message.suggestion.code && (
                      <pre className="text-xs bg-black bg-opacity-20 p-2 rounded overflow-x-auto">
                        <code>{message.suggestion.code}</code>
                      </pre>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-gray-600 text-sm">AI Tutor is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex space-x-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                tutorMode === 'code-review'
                  ? "Paste your code here for review..."
                  : tutorMode === 'practice'
                  ? "What would you like to practice?"
                  : "Ask me anything about programming..."
              }
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={2}
              disabled={isLoading}
              data-testid="input-ai-tutor-message"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                !input.trim() || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
              data-testid="button-send-message"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}