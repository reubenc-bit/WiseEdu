import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, CornerUpLeft, CornerUpRight, Hand, Upload, Bot, HelpCircle, X, Play, Clock, Wrench, Trophy, Puzzle, FileText, Gamepad2, Target, BookOpen, Settings } from 'lucide-react';

interface RoboticsLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity?: {
    title?: string;
    mazeData?: {
      start: [number, number];
      goal: [number, number];
      walls?: [number, number][];
    };
    points?: number;
  };
}

interface RobotPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
}

interface BlockCommand {
  id: string;
  type: 'move' | 'turn' | 'action' | 'control';
  action: string;
  icon: string;
  color: string;
  value?: number;
}

export function RoboticsLabModal({ isOpen, onClose, activity }: RoboticsLabModalProps) {
  const { user } = useAuth();
  const [robotPosition, setRobotPosition] = useState<RobotPosition>({ x: 0, y: 0, direction: 'right' });
  const [isRunning, setIsRunning] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [programBlocks, setProgramBlocks] = useState<BlockCommand[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [currentTab, setCurrentTab] = useState<'build' | 'simulate' | 'challenge'>('build');

  // TODO: Implement proper age group determination
  // For now, defaulting to older students (12-17) as a reasonable fallback
  const ageGroup: '6-11' | '12-17' = '12-17';
  const isLittleCoder = ageGroup === '6-11';

  // Helper function to render icons
  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'ArrowUp': return <ArrowUp className={className} />;
      case 'CornerUpLeft': return <CornerUpLeft className={className} />;
      case 'CornerUpRight': return <CornerUpRight className={className} />;
      case 'Hand': return <Hand className={className} />;
      case 'Upload': return <Upload className={className} />;
      case 'RotateCcw': return <RotateCcw className={className} />;
      case 'HelpCircle': return <HelpCircle className={className} />;
      default: return <Bot className={className} />;
    }
  };

  // Available programming blocks
  const availableBlocks: BlockCommand[] = [
    { id: 'move_forward', type: 'move', action: 'move_forward', icon: 'ArrowUp', color: 'bg-blue-500' },
    { id: 'turn_left', type: 'turn', action: 'turn_left', icon: 'CornerUpLeft', color: 'bg-green-500' },
    { id: 'turn_right', type: 'turn', action: 'turn_right', icon: 'CornerUpRight', color: 'bg-green-500' },
    { id: 'pick_up', type: 'action', action: 'pick_up', icon: 'Hand', color: 'bg-purple-500' },
    { id: 'drop', type: 'action', action: 'drop', icon: 'Upload', color: 'bg-purple-500' },
    { id: 'repeat', type: 'control', action: 'repeat', icon: 'RotateCcw', color: 'bg-orange-500', value: 3 },
    { id: 'if_obstacle', type: 'control', action: 'if_obstacle', icon: 'HelpCircle', color: 'bg-red-500' }
  ];

  useEffect(() => {
    if (isOpen && activity) {
      resetSimulation();
    }
  }, [isOpen, activity]);

  const resetSimulation = () => {
    if (activity?.mazeData) {
      setRobotPosition({ 
        x: activity.mazeData.start[0], 
        y: activity.mazeData.start[1], 
        direction: 'right' 
      });
    } else {
      setRobotPosition({ x: 0, y: 0, direction: 'right' });
    }
    setIsRunning(false);
    setExecutionLog([]);
    setCurrentStep(0);
    setScore(0);
    setGameComplete(false);
  };

  const addBlock = (block: BlockCommand) => {
    const newBlock = {
      ...block,
      id: `${block.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    setProgramBlocks(prev => [...prev, newBlock]);
  };

  const removeBlock = (blockId: string) => {
    setProgramBlocks(prev => prev.filter(block => block.id !== blockId));
  };

  const executeProgram = async () => {
    if (programBlocks.length === 0) {
      setExecutionLog(prev => [...prev, 'No blocks to execute! Add some blocks first.']);
      return;
    }

    setIsRunning(true);
    setExecutionLog(['Starting robot program...']);
    setCurrentStep(0);

    for (let i = 0; i < programBlocks.length; i++) {
      if (!isRunning) break;

      setCurrentStep(i);
      const block = programBlocks[i];
      await executeBlock(block);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation delay
    }

    setIsRunning(false);
    setCurrentStep(-1);
    checkGameCompletion();
  };

  const executeBlock = async (block: BlockCommand) => {
    setExecutionLog(prev => [...prev, `Executing: ${block.action.replace('_', ' ').toUpperCase()}`]);

    switch (block.action) {
      case 'move_forward':
        setRobotPosition(prev => {
          let newX = prev.x;
          let newY = prev.y;

          switch (prev.direction) {
            case 'up': newY = Math.max(0, prev.y - 1); break;
            case 'down': newY = Math.min(4, prev.y + 1); break;
            case 'left': newX = Math.max(0, prev.x - 1); break;
            case 'right': newX = Math.min(4, prev.x + 1); break;
          }

          // Check for walls in maze activities
          if (activity?.mazeData?.walls?.some(([wx, wy]: number[]) => wx === newX && wy === newY)) {
            setExecutionLog(prev => [...prev, 'Blocked by wall! Robot cannot move.']);
            return prev;
          }

          setExecutionLog(prev => [...prev, `Robot moved to position (${newX}, ${newY})`]);
          return { ...prev, x: newX, y: newY };
        });
        break;

      case 'turn_left':
        setRobotPosition(prev => {
          const directions = ['up', 'left', 'down', 'right'] as const;
          const currentIndex = directions.indexOf(prev.direction);
          const newDirection = directions[(currentIndex + 1) % 4];
          setExecutionLog(prev => [...prev, `Robot turned left, now facing ${newDirection}`]);
          return { ...prev, direction: newDirection };
        });
        break;

      case 'turn_right':
        setRobotPosition(prev => {
          const directions = ['up', 'right', 'down', 'left'] as const;
          const currentIndex = directions.indexOf(prev.direction);
          const newDirection = directions[(currentIndex + 1) % 4];
          setExecutionLog(prev => [...prev, `🔄 Robot turned right, now facing ${newDirection}`]);
          return { ...prev, direction: newDirection };
        });
        break;

      case 'pick_up':
        setExecutionLog(prev => [...prev, '🤏 Robot picked up an object']);
        setScore(prev => prev + 10);
        break;

      case 'drop':
        setExecutionLog(prev => [...prev, '📤 Robot dropped an object']);
        break;

      case 'repeat':
        setExecutionLog(prev => [...prev, `🔄 Repeat block (${block.value || 3} times) - simplified execution`]);
        break;

      case 'if_obstacle':
        setExecutionLog(prev => [...prev, '❓ Checking for obstacles...']);
        break;
    }
  };

  const checkGameCompletion = () => {
    if (activity?.mazeData) {
      const [goalX, goalY] = activity.mazeData.goal;
      if (robotPosition.x === goalX && robotPosition.y === goalY) {
        setGameComplete(true);
        setScore(prev => prev + activity.points || 100);
        setExecutionLog(prev => [...prev, '🎉 Congratulations! You reached the goal!']);
      }
    }
  };

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'up': return '⬆️';
      case 'down': return '⬇️';
      case 'left': return '⬅️';
      case 'right': return '➡️';
      default: return '🤖';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" data-testid="modal-robotics-lab">
      <div className="bg-white rounded-2xl max-w-7xl w-full mx-4 h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div>
            <h2 className="text-2xl font-bold flex items-center" data-testid="text-robotics-lab-title">
              <Bot className="w-6 h-6 mr-2" />
              Robotics Lab
            </h2>
            <p className="text-orange-100 text-sm">
              {activity?.title || 'Interactive Robot Programming Environment'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition"
            data-testid="button-close-robotics-lab"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b bg-gray-50">
          {[
            { id: 'build', label: 'Build Program', icon: <Wrench className="w-4 h-4 mr-1" /> },
            { id: 'simulate', label: 'Robot Simulator', icon: <Bot className="w-4 h-4 mr-1" /> },
            { id: 'challenge', label: 'Challenge Mode', icon: <Trophy className="w-4 h-4 mr-1" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition ${
                currentTab === tab.id
                  ? 'bg-white text-orange-600 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'
              }`}
              data-testid={`button-tab-${tab.id}`}
            >
              <div className="flex items-center">
                {tab.icon}
                {tab.label}
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Build Tab */}
          {currentTab === 'build' && (
            <div className="flex w-full">
              {/* Block Palette */}
              <div className="w-64 border-r border-gray-300 bg-gray-50 p-4">
                <h3 className="font-bold mb-4 flex items-center">
                  <Puzzle className="w-5 h-5 mr-2" />
                  Code Blocks
                </h3>
                <div className="space-y-2" data-testid="container-available-blocks">
                  {availableBlocks.map((block) => (
                    <button
                      key={block.id}
                      onClick={() => addBlock(block)}
                      className={`w-full p-3 ${block.color} text-white rounded-lg hover:opacity-90 transition text-left`}
                      data-testid={`button-add-block-${block.id}`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{block.icon}</span>
                        <div>
                          <div className="font-semibold text-sm">
                            {block.action.replace('_', ' ').toUpperCase()}
                          </div>
                          {block.value && (
                            <div className="text-xs opacity-80">Value: {block.value}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Program Builder */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Your Program
                  </h3>
                  <div className="space-x-2">
                    <button
                      onClick={resetSimulation}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                      data-testid="button-reset-program"
                    >
                      🔄 Reset
                    </button>
                    <button
                      onClick={executeProgram}
                      disabled={isRunning || programBlocks.length === 0}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        isRunning || programBlocks.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                      data-testid="button-run-program"
                    >
                      {isRunning ? '⏳ Running...' : '▶️ Run Program'}
                    </button>
                  </div>
                </div>

                {/* Program Blocks */}
                <div className="bg-gray-100 p-4 rounded-lg min-h-40 border-2 border-dashed border-gray-300" data-testid="container-program-blocks">
                  {programBlocks.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      Drag blocks from the left to build your program!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {programBlocks.map((block, index) => (
                        <div
                          key={block.id}
                          className={`p-3 ${block.color} text-white rounded-lg flex items-center justify-between ${
                            currentStep === index ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
                          }`}
                          data-testid={`program-block-${index}`}
                        >
                          <div className="flex items-center">
                            <span className="text-xl mr-2">{block.icon}</span>
                            <span className="font-semibold">
                              {block.action.replace('_', ' ').toUpperCase()}
                            </span>
                            {block.value && (
                              <span className="ml-2 text-sm opacity-80">({block.value})</span>
                            )}
                          </div>
                          <button
                            onClick={() => removeBlock(block.id)}
                            className="text-white hover:text-red-200 transition"
                            data-testid={`button-remove-block-${index}`}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Simulate Tab */}
          {currentTab === 'simulate' && (
            <div className="flex w-full">
              {/* Simulation Area */}
              <div className="flex-1 p-6">
                <h3 className="font-bold mb-4 flex items-center">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Robot Simulator
                </h3>

                {/* Grid/Maze Display */}
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
                    {Array.from({ length: 25 }, (_, index) => {
                      const x = index % 5;
                      const y = Math.floor(index / 5);
                      const isRobot = robotPosition.x === x && robotPosition.y === y;
                      const isWall = activity?.mazeData?.walls?.some(([wx, wy]: number[]) => wx === x && wy === y);
                      const isGoal = activity?.mazeData?.goal?.[0] === x && activity?.mazeData?.goal?.[1] === y;
                      const isStart = activity?.mazeData?.start?.[0] === x && activity?.mazeData?.start?.[1] === y;

                      return (
                        <div
                          key={index}
                          className={`w-12 h-12 border border-gray-600 flex items-center justify-center text-xl ${
                            isWall ? 'bg-gray-600' :
                            isGoal ? 'bg-yellow-400' :
                            isStart ? 'bg-blue-400' :
                            'bg-gray-200'
                          }`}
                          data-testid={`grid-cell-${x}-${y}`}
                        >
                          {isRobot && (
                            <span className="text-2xl" data-testid="robot-position">
                              {getDirectionIcon(robotPosition.direction)}
                            </span>
                          )}
                          {isGoal && !isRobot && '🎯'}
                          {isStart && !isRobot && !isGoal && '🏠'}
                          {isWall && '🧱'}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Robot Status */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <div className="font-semibold">Position</div>
                    <div className="text-lg" data-testid="text-robot-position">
                      ({robotPosition.x}, {robotPosition.y})
                    </div>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg text-center">
                    <div className="font-semibold">Direction</div>
                    <div className="text-lg" data-testid="text-robot-direction">
                      {getDirectionIcon(robotPosition.direction)} {robotPosition.direction.toUpperCase()}
                    </div>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg text-center">
                    <div className="font-semibold">Score</div>
                    <div className="text-lg" data-testid="text-robot-score">{score} pts</div>
                  </div>
                </div>

                {gameComplete && (
                  <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" data-testid="message-game-complete">
                    🎉 Challenge Complete! Well done, programmer!
                  </div>
                )}
              </div>

              {/* Execution Log */}
              <div className="w-80 border-l border-gray-300 bg-gray-50 p-4">
                <h4 className="font-bold mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Execution Log
                </h4>
                <div className="bg-black text-green-400 p-3 rounded-lg h-96 overflow-y-auto font-mono text-sm" data-testid="container-execution-log">
                  {executionLog.length === 0 ? (
                    <div className="text-gray-500">No program execution yet...</div>
                  ) : (
                    executionLog.map((log, index) => (
                      <div key={index} className="mb-1" data-testid={`log-entry-${index}`}>
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Challenge Tab */}
          {currentTab === 'challenge' && (
            <div className="flex-1 p-6">
              <h3 className="font-bold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Challenge Mode
              </h3>
              
              {activity ? (
                <div className="space-y-6">
                  {/* Activity Info */}
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-2">{activity.title}</h4>
                    <p className="text-gray-700 mb-4">{activity.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-3 py-1 rounded-full ${
                        activity.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        activity.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {activity.difficulty.toUpperCase()}
                      </span>
                      <span className="text-gray-600">⏱️ {activity.estimatedMinutes} mins</span>
                      <span className="text-gray-600">⚡ {activity.points} points</span>
                    </div>
                  </div>

                  {/* Instructions */}
                  {activity.instructions && (
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-bold mb-4">📖 Instructions</h4>
                      <div className="space-y-3">
                        {activity.instructions.map((instruction: any, index: number) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {instruction.step}
                            </div>
                            <div className="text-gray-700">{instruction.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setCurrentTab('build')}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      data-testid="button-start-building"
                    >
                      🔧 Start Building
                    </button>
                    <button
                      onClick={() => setCurrentTab('simulate')}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      data-testid="button-view-simulator"
                    >
                      🤖 View Simulator
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <div className="text-6xl mb-4">🤖</div>
                  <h4 className="text-xl font-bold mb-2">Welcome to Robotics Lab!</h4>
                  <p>Select a robotics activity from your dashboard to begin programming.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}