import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { courseData, roboticsActivities } from "@/data/courseData";
import { AITutorModal } from "@/components/AITutorModal";
import { VideoConferenceModal } from "@/components/VideoConferenceModal";
import { MicrobitDeviceConnector } from "@/components/MicrobitDeviceConnector";
import { RoboticsLabModal } from "@/components/RoboticsLabModal";
import { CodingEnvironment } from "@/components/CodingEnvironment";
import { StudentLearningMaterials } from "@/components/StudentLearningMaterials";
import { Code, Bot, Star, RotateCcw, Package, Sparkles, Bug, Palette, Gamepad2, Lightbulb, User, Trophy, Zap, Puzzle, Play, MapPin, Target } from "lucide-react";

interface StudentDashboardProps {
  onCodingLabOpen?: () => void;
}

interface ChatMessage {
  type: 'user' | 'ai';
  message: string;
}

export default function StudentDashboard({ onCodingLabOpen }: StudentDashboardProps) {
  const { user } = useAuth();
  const [aiChatInput, setAiChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      type: 'ai',
      message: "Hi! I'm your AI coding assistant. Ask me about programming concepts, debugging help, or project ideas!"
    }
  ]);

  // Advanced feature modals
  const [showAITutor, setShowAITutor] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showDeviceConnector, setShowDeviceConnector] = useState(false);
  const [showRoboticsLab, setShowRoboticsLab] = useState(false);
  const [showCodingLab, setShowCodingLab] = useState(false);
  const [selectedRoboticsActivity, setSelectedRoboticsActivity] = useState<any>(null);

  // TODO: Implement proper age group determination based on user preferences or enrollment data
  // For now, using a more realistic default - most students are in the 12-17 range
  // This should be based on user's actual age or preferences, not role
  const ageGroup: '6-11' | '12-17' = '12-17'; // Default to older students for better UX
  const isLittleCoder = ageGroup === '6-11';

  const sendAIMessage = () => {
    if (!aiChatInput.trim()) return;

    // Add user message
    const userMessage: ChatMessage = { type: 'user', message: aiChatInput };
    setChatMessages(prev => [...prev, userMessage]);

    // Generate AI response
    const aiResponse = generateAIResponse(aiChatInput, isLittleCoder);
    const aiMessage: ChatMessage = { type: 'ai', message: aiResponse };

    // Add AI response after a short delay
    setTimeout(() => {
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setAiChatInput('');
  };

  const generateAIResponse = (message: string, isLittleCoder: boolean): string => {
    const lowercaseMessage = message.toLowerCase();

    const responses = isLittleCoder ? {
      'help': "I'm here to help! What would you like to learn about coding today?",
      'loop': "A loop is like doing something over and over! Like brushing your teeth every morning. In coding, we use loops to repeat actions!",
      'variable': "A variable is like a box where you store things! You can put numbers, words, or other stuff in it and use it later!",
      'function': "A function is like a magic spell! You give it a name and it does something special when you call it!",
      'debug': "Debugging is like being a detective! When your code doesn't work, we look for clues to fix it!",
      'project': "Let's build something cool! How about making a dancing robot or a color-changing rainbow?",
      'scratch': "Scratch is super fun! You drag colorful blocks to make your characters move and dance! Want to try it?",
      'default': "That's a great question! Coding is like solving puzzles with blocks. What would you like to create today?"
    } : {
      'help': "I'm your AI coding mentor! I can help with programming concepts, debugging, project ideas, and code reviews. What do you need help with?",
      'loop': "Loops are fundamental control structures that repeat code blocks. Common types include for loops, while loops, and do-while loops. They help avoid code duplication and process collections efficiently.",
      'variable': "Variables are named containers that store data values. They have types (string, number, boolean, etc.) and scope (global, local). Good naming conventions make code more readable.",
      'function': "Functions are reusable blocks of code that perform specific tasks. They can take parameters, return values, and help organize code into modular, maintainable pieces.",
      'debug': "Debugging involves identifying and fixing code errors. Use console.log() for JavaScript, print() for Python, or your IDE's debugger. Check for syntax errors, logic errors, and runtime exceptions.",
      'javascript': "JavaScript is a versatile programming language for web development. It handles DOM manipulation, event handling, and can run on both client and server-side with Node.js.",
      'python': "Python is excellent for beginners and powerful for advanced projects. It's used in web development, data science, AI/ML, and automation. The syntax is clean and readable.",
      'project': "Great project ideas: Build a to-do app, create a simple game, develop a weather app using APIs, or try machine learning with TensorFlow.js or Python. What interests you most?",
      'default': "I'm here to help with any programming questions! Whether it's syntax, algorithms, best practices, or project guidance, feel free to ask."
    };

    // Find matching response
    for (const [key, response] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key)) {
        return response;
      }
    }

    return responses.default;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendAIMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modals */}
      <AITutorModal isOpen={showAITutor} onClose={() => setShowAITutor(false)} />
      <VideoConferenceModal isOpen={showVideoCall} onClose={() => setShowVideoCall(false)} />
      <MicrobitDeviceConnector isOpen={showDeviceConnector} onClose={() => setShowDeviceConnector(false)} />
      <RoboticsLabModal 
        isOpen={showRoboticsLab} 
        onClose={() => setShowRoboticsLab(false)} 
        activity={selectedRoboticsActivity}
      />
      
      {/* Coding Lab Modal */}
      {showCodingLab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" data-testid="modal-coding-lab">
          <div className="bg-white rounded-2xl max-w-7xl w-full mx-4 h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <div>
                <h2 className="text-2xl font-bold">Coding Lab</h2>
                <p className="text-blue-100">Interactive coding environment</p>
              </div>
              <button
                onClick={() => setShowCodingLab(false)}
                className="text-white hover:text-gray-200 transition-colors"
                data-testid="button-close-coding-lab"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Coding Environment Content */}
            <div className="flex-1 p-6 overflow-hidden">
              <CodingEnvironment 
                projectId="dashboard-project"
                initialCode="# Welcome to CodewiseHub Coding Lab!\nprint('Hello, World!')\n\n# Start coding below:"
                language="python"
              />
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome-student">
                Welcome back, {user?.firstName || 'Student'}!
              </h1>
              <p className="text-pink-100">Ready for another coding adventure?</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCodingLab(true)}
                className="bg-white text-pink-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition"
                data-testid="button-coding-lab"
              >
                <Code className="w-4 h-4 mr-2 inline" />Lab
              </button>
              <button
                onClick={() => setShowAITutor(true)}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full font-bold hover:bg-opacity-30 transition"
                data-testid="button-ai-tutor"
              >
                <Bot className="w-4 h-4 mr-2 inline" />AI Tutor
              </button>
              {user?.role === 'teacher' && (
                <button
                  onClick={() => setShowVideoCall(true)}
                  className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full font-bold hover:bg-opacity-30 transition"
                  data-testid="button-video-call"
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Video
                </button>
              )}
              <button
                onClick={() => setShowDeviceConnector(true)}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full font-bold hover:bg-opacity-30 transition"
                data-testid="button-device-connector"
              >
                <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Device
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center" data-testid="stat-lessons-completed">
            <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
            <div className="text-gray-600">Lessons Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center" data-testid="stat-projects-built">
            <div className="text-3xl font-bold text-green-600 mb-2">5</div>
            <div className="text-gray-600">Projects Built</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center" data-testid="stat-badges-earned">
            <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
            <div className="text-gray-600">Badges Earned</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center" data-testid="stat-coding-hours">
            <div className="text-3xl font-bold text-orange-600 mb-2">45</div>
            <div className="text-gray-600">Hours Coded</div>
          </div>
        </div>

        {/* Student Learning Materials */}
        <div className="mb-8">
          <StudentLearningMaterials ageGroup={ageGroup} />
        </div>

        {/* Robotics Activities for Little Coders */}
        {isLittleCoder && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              Robotics Fun Zone
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roboticsActivities["6-11"].map((activity) => (
                <div
                  key={activity.id}
                  onClick={() => {
                    setSelectedRoboticsActivity(activity);
                    setShowRoboticsLab(true);
                  }}
                  className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  data-testid={`robotics-activity-${activity.id}`}
                >
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-yellow-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-3xl">
{activity.type === 'maze' ? <Play className="w-8 h-8 text-blue-600" /> : 
                       activity.type === 'puzzle' ? <Puzzle className="w-8 h-8 text-purple-600" /> : 
                       activity.type === 'challenge' ? <Target className="w-8 h-8 text-yellow-600" /> : 
                       <Palette className="w-8 h-8 text-green-600" />}
                    </div>
                  </div>
                  <h3 className="font-bold mb-2">{activity.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      activity.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.difficulty}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      {activity.points} pts
                    </span>
                  </div>
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                    Open Robotics Lab
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1a3 3 0 000-6h-1m0 6v6m0-6h3m-3 0l.01 0M3 21h18M3 10h18" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Block Coding Basics</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">3 of 4 lessons complete</div>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Continue
                  </button>
                </div>

                {/* Age-specific content */}
                {isLittleCoder && (
                  <>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white mr-4">
                        <Bot className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Robot Adventures</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">1 of 5 lessons complete</div>
                      </div>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        Start
                      </button>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Micro:bit Magic</h3>
                        <div className="text-sm text-gray-600">Create LED patterns and games</div>
                      </div>
                      <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
                        Explore
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Achievements & Progress */}
          <div className="space-y-6">
            {/* AI Coding Assistant */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-bold mb-4">
                <Bot className="w-5 h-5 text-blue-500 mr-2 inline" />AI Study Helper
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 h-48 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex items-start mb-3 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                    {msg.type === 'ai' && (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-3">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div className={`rounded-lg p-2 max-w-xs ${
                      msg.type === 'user' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    {msg.type === 'user' && (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs ml-3">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={aiChatInput}
                  onChange={(e) => setAiChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about coding..."
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={sendAIMessage}
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-bold mb-4">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2 inline" />Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="mr-3">
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">First Program Complete!</div>
                    <div className="text-xs text-gray-600">Completed your first coding lesson</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div className="mr-3">
                    <Bot className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Robot Master</div>
                    <div className="text-xs text-gray-600">Successfully programmed a robot</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div className="mr-3">
                    <Puzzle className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Problem Solver</div>
                    <div className="text-xs text-gray-600">Solved 5 coding challenges</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}