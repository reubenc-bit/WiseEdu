import { useState } from 'react';
import { courseData } from '@/data/courseData';
import { Clock, CheckCircle, Star, Gamepad2, Bot, Globe, BookOpen, Play, RotateCcw, FileText, BarChart3, Lightbulb, Target, Users, Palette, Rocket, Trophy, Zap, Wrench, Bug, Smartphone } from 'lucide-react';

interface StudentLearningMaterialsProps {
  ageGroup: '6-11' | '12-17';
}

interface ProgressData {
  courseId: string;
  lessonId: string;
  completed: boolean;
  progress: number;
}

export function StudentLearningMaterials({ ageGroup }: StudentLearningMaterialsProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [progressData, setProgressData] = useState<ProgressData[]>([
    // Mock progress data
    { courseId: 'visual-coding-basics', lessonId: 'meet-coding-buddy', completed: true, progress: 100 },
    { courseId: 'visual-coding-basics', lessonId: 'first-block-program', completed: true, progress: 100 },
    { courseId: 'visual-coding-basics', lessonId: 'colors-loops', completed: false, progress: 75 },
    { courseId: 'javascript-foundations', lessonId: 'variables-data-types', completed: true, progress: 100 },
  ]);

  const courses = courseData[ageGroup] || [];
  const isLittleCoder = ageGroup === '6-11';

  const getCourseProgress = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return { completed: 0, total: 0, percentage: 0 };
    
    const total = course.lessons.length;
    const completed = progressData.filter(p => 
      p.courseId === courseId && p.completed
    ).length;
    
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'programming': return <BookOpen className="w-8 h-8" />;
      case 'robotics': return <Bot className="w-8 h-8" />;
      case 'game-development': return <Gamepad2 className="w-8 h-8" />;
      case 'web-development': return <Globe className="w-8 h-8" />;
      default: return <BookOpen className="w-8 h-8" />;
    }
  };

  return (
    <div className="space-y-6" data-testid="container-learning-materials">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          {isLittleCoder ? (
            <><Star className="w-6 h-6 text-yellow-500 mr-2" />Learning Adventures</>
          ) : (
            <><BookOpen className="w-6 h-6 text-blue-500 mr-2" />Course Library</>
          )}
        </h2>
        <div className="text-sm text-gray-600">
          {ageGroup === '6-11' ? 'Ages 6-11' : 'Ages 12-17'} • {courses.length} courses available
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-courses">
        {courses.map((course) => {
          const progress = getCourseProgress(course.id);
          
          return (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
              data-testid={`course-card-${course.id}`}
            >
              {/* Course Icon and Category */}
              <div className="flex justify-between items-start mb-4">
                <div className="text-blue-500">{getCategoryIcon(course.category)}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty.toUpperCase()}
                </span>
              </div>

              {/* Course Title and Description */}
              <h3 className="text-lg font-bold mb-2" data-testid={`course-title-${course.id}`}>
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {course.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">
                    {progress.completed}/{progress.total} lessons
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.percentage}%` }}
                    data-testid={`progress-bar-${course.id}`}
                  />
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {progress.percentage}% complete
                </div>
              </div>

              {/* Course Stats */}
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.estimatedHours}h
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.lessons.length} lessons
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium transition ${
                  progress.percentage > 0
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
                data-testid={`button-course-action-${course.id}`}
              >
                {progress.percentage > 0 
                  ? `Continue Learning (${progress.percentage}%)`
                  : isLittleCoder 
                    ? (<><Rocket className="w-4 h-4 mr-1 inline" />Start Adventure</>)
                    : 'Start Course'
                }
              </button>

              {/* Expanded Course Details */}
              {selectedCourse === course.id && (
                <div className="mt-4 pt-4 border-t border-gray-200" data-testid={`course-details-${course.id}`}>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />Course Lessons
                  </h4>
                  <div className="space-y-2">
                    {course.lessons.map((lesson, index) => {
                      const lessonProgress = progressData.find(p => 
                        p.courseId === course.id && p.lessonId === lesson.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
                      );
                      
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          data-testid={`lesson-item-${course.id}-${index}`}
                        >
                          <div className="flex items-center flex-1">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 ${
                              lessonProgress?.completed
                                ? 'bg-green-500 text-white'
                                : lessonProgress?.progress
                                ? 'bg-yellow-500 text-white'
                                : 'bg-gray-300 text-gray-600'
                            }`}>
                              {lessonProgress?.completed ? <CheckCircle className="w-3 h-3" /> : index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{lesson.title}</div>
                              <div className="text-xs text-gray-600">{lesson.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-2">
                            <span className="text-xs text-gray-500">
                              {lesson.estimatedMinutes}min
                            </span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              lesson.type === 'interactive' ? 'bg-blue-100 text-blue-800' :
                              lesson.type === 'project' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {lesson.type}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Course Actions */}
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 py-2 px-3 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition">
                      {isLittleCoder ? (
                        <><Play className="w-4 h-4 mr-1 inline" />Play Next Lesson</>
                      ) : (
                        <><BookOpen className="w-4 h-4 mr-1 inline" />Next Lesson</>
                      )}
                    </button>
                    {progress.percentage > 0 && (
                      <button className="flex-1 py-2 px-3 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition">
                        <><BarChart3 className="w-4 h-4 mr-1 inline" />View Progress</>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg" data-testid="container-learning-tips">
        <h3 className="text-lg font-bold mb-3 flex items-center">
          {isLittleCoder ? (
            <><Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />Super Learning Tips!</>
          ) : (
            <><Target className="w-5 h-5 text-blue-500 mr-2" />Learning Tips</>
          )}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {isLittleCoder ? (
            <>
              <div className="flex items-start">
                <Star className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                <div>
                  <div className="font-semibold">Take breaks and have fun!</div>
                  <div className="text-gray-600">Learning is like playing - do it when you feel happy and excited!</div>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <div className="font-semibold">Ask for help when stuck</div>
                  <div className="text-gray-600">It's okay to ask parents, teachers, or friends for help with tricky parts!</div>
                </div>
              </div>
              <div className="flex items-start">
                <Palette className="w-5 h-5 text-purple-500 mr-2 mt-0.5" />
                <div>
                  <div className="font-semibold">Make it your own</div>
                  <div className="text-gray-600">Change colors, add your own ideas, and make projects that make you smile!</div>
                </div>
              </div>
              <div className="flex items-start">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                <div>
                  <div className="font-semibold">Celebrate your wins</div>
                  <div className="text-gray-600">Every time you finish a lesson, do a happy dance - you're awesome!</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start">
                <Zap className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                <div>
                  <div className="font-semibold">Practice consistently</div>
                  <div className="text-gray-600">Set aside regular time for coding to build strong programming habits.</div>
                </div>
              </div>
              <div className="flex items-start">
                <Wrench className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <div className="font-semibold">Build projects</div>
                  <div className="text-gray-600">Apply concepts by creating your own projects outside of lessons.</div>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <div className="font-semibold">Join coding communities</div>
                  <div className="text-gray-600">Connect with other learners to share knowledge and get inspired.</div>
                </div>
              </div>
              <div className="flex items-start">
                <Bug className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <div className="font-semibold">Embrace debugging</div>
                  <div className="text-gray-600">Errors are learning opportunities - each bug teaches valuable problem-solving skills.</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="container-quick-access">
        <button className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-center">
          <Bot className="w-8 h-8 mx-auto mb-2" />
          <div className="font-semibold text-sm">AI Tutor</div>
          <div className="text-xs opacity-80">Get coding help</div>
        </button>
        
        <button className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-center">
          <Smartphone className="w-8 h-8 mx-auto mb-2" />
          <div className="font-semibold text-sm">micro:bit</div>
          <div className="text-xs opacity-80">Connect device</div>
        </button>
        
        <button className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-center">
          <Gamepad2 className="w-8 h-8 mx-auto mb-2" />
          <div className="font-semibold text-sm">Code Lab</div>
          <div className="text-xs opacity-80">Practice coding</div>
        </button>
        
        <button className="p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-center">
          <Trophy className="w-8 h-8 mx-auto mb-2" />
          <div className="font-semibold text-sm">Challenges</div>
          <div className="text-xs opacity-80">Test your skills</div>
        </button>
      </div>
    </div>
  );
}