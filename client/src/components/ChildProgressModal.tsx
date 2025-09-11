import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Target,
  Clock,
  BookOpen,
  Code,
  Calendar,
  Star,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  Users,
  Trophy,
  Activity,
  Brain,
  Gamepad2,
  Sparkles
} from "lucide-react";

interface ChildProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Child {
  id: string;
  name: string;
  age: number;
  currentCourse: string;
  level: string;
  totalLessons: number;
  completedLessons: number;
  currentStreak: number;
  longestStreak: number;
  totalHours: number;
  averageGrade: number;
  achievements: Achievement[];
  skills: Skill[];
  recentActivity: Activity[];
  upcomingMilestones: Milestone[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Skill {
  name: string;
  level: number;
  maxLevel: number;
  progress: number;
  category: 'logic' | 'creativity' | 'problem-solving' | 'syntax' | 'debugging';
}

interface Activity {
  id: string;
  type: 'lesson' | 'project' | 'quiz' | 'achievement';
  title: string;
  timestamp: string;
  score?: number;
  duration?: number;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  estimatedCompletion: string;
}

export function ChildProgressModal({ isOpen, onClose }: ChildProgressModalProps) {
  const [selectedChild, setSelectedChild] = useState<string>("emily-chen");
  const [timeRange, setTimeRange] = useState<string>("30d");
  const [viewMode, setViewMode] = useState<string>("overview");

  // Mock data
  const children: Child[] = [
    {
      id: "emily-chen",
      name: "Emily Chen",
      age: 12,
      currentCourse: "Advanced Python",
      level: "Intermediate",
      totalLessons: 45,
      completedLessons: 38,
      currentStreak: 7,
      longestStreak: 12,
      totalHours: 124,
      averageGrade: 94,
      achievements: [
        {
          id: "first-code",
          title: "First Code",
          description: "Wrote your first program",
          icon: "code",
          unlockedAt: "2024-01-15",
          rarity: "common"
        },
        {
          id: "streak-master",
          title: "Streak Master",
          description: "Maintained a 10-day learning streak",
          icon: "flame",
          unlockedAt: "2024-02-20",
          rarity: "rare"
        },
        {
          id: "problem-solver",
          title: "Problem Solver",
          description: "Solved 50 coding challenges",
          icon: "brain",
          unlockedAt: "2024-03-01",
          rarity: "epic"
        }
      ],
      skills: [
        { name: "Python Syntax", level: 8, maxLevel: 10, progress: 80, category: "syntax" },
        { name: "Logic & Reasoning", level: 9, maxLevel: 10, progress: 90, category: "logic" },
        { name: "Problem Solving", level: 7, maxLevel: 10, progress: 70, category: "problem-solving" },
        { name: "Creative Thinking", level: 6, maxLevel: 10, progress: 60, category: "creativity" },
        { name: "Debugging", level: 5, maxLevel: 10, progress: 50, category: "debugging" }
      ],
      recentActivity: [
        {
          id: "act1",
          type: "lesson",
          title: "Object-Oriented Programming",
          timestamp: "2024-03-15T14:30:00Z",
          score: 96,
          duration: 45
        },
        {
          id: "act2",
          type: "project",
          title: "Calculator App",
          timestamp: "2024-03-14T16:20:00Z",
          score: 88,
          duration: 90
        },
        {
          id: "act3",
          type: "achievement",
          title: "Problem Solver Badge",
          timestamp: "2024-03-13T10:15:00Z"
        }
      ],
      upcomingMilestones: [
        {
          id: "mil1",
          title: "Python Expert",
          description: "Complete all Python fundamentals",
          progress: 38,
          target: 45,
          estimatedCompletion: "2024-03-25"
        },
        {
          id: "mil2",
          title: "Game Developer",
          description: "Build your first game",
          progress: 2,
          target: 5,
          estimatedCompletion: "2024-04-10"
        }
      ]
    }
  ];

  const currentChild = children.find(c => c.id === selectedChild);

  const getSkillColor = (category: string) => {
    const colors = {
      'syntax': 'bg-blue-100 text-blue-800',
      'logic': 'bg-green-100 text-green-800',
      'problem-solving': 'bg-purple-100 text-purple-800',
      'creativity': 'bg-pink-100 text-pink-800',
      'debugging': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      'common': 'bg-gray-100 text-gray-800',
      'rare': 'bg-blue-100 text-blue-800',
      'epic': 'bg-purple-100 text-purple-800',
      'legendary': 'bg-yellow-100 text-yellow-800'
    };
    return colors[rarity as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-4 h-4" />;
      case 'project':
        return <Code className="w-4 h-4" />;
      case 'quiz':
        return <Brain className="w-4 h-4" />;
      case 'achievement':
        return <Trophy className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const progressPercentage = currentChild ? Math.round((currentChild.completedLessons / currentChild.totalLessons) * 100) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Child Progress Analytics
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[85vh]">
          <div className="flex items-center gap-4 mb-4">
            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-64">
                <Users className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name} ({child.age} years)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="ml-auto" data-testid="button-download-report">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>

          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="flex-1 overflow-auto">
              {currentChild && (
                <div className="space-y-6">
                  {/* Progress Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                            <p className="text-2xl font-bold">{progressPercentage}%</p>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                            <Target className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                        <Progress value={progressPercentage} className="mt-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {currentChild.completedLessons}/{currentChild.totalLessons} lessons
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                            <p className="text-2xl font-bold">{currentChild.currentStreak} days</p>
                          </div>
                          <Sparkles className="w-8 h-8 text-yellow-500" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Best: {currentChild.longestStreak} days
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
                            <p className="text-2xl font-bold">{currentChild.averageGrade}%</p>
                          </div>
                          <Star className="w-8 h-8 text-yellow-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Learning Time</p>
                            <p className="text-2xl font-bold">{currentChild.totalHours}h</p>
                          </div>
                          <Clock className="w-8 h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Current Course Status */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BookOpen className="w-5 h-5 mr-2" />
                          Current Learning Path
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{currentChild.currentCourse}</h3>
                            <p className="text-sm text-muted-foreground">Level: {currentChild.level}</p>
                          </div>
                          <Badge variant="outline">{currentChild.age} years old</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Course Progress</span>
                            <span>{progressPercentage}%</span>
                          </div>
                          <Progress value={progressPercentage} />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center p-2 bg-muted/30 rounded">
                            <p className="font-medium">{currentChild.completedLessons}</p>
                            <p className="text-muted-foreground">Completed</p>
                          </div>
                          <div className="text-center p-2 bg-muted/30 rounded">
                            <p className="font-medium">{currentChild.totalLessons - currentChild.completedLessons}</p>
                            <p className="text-muted-foreground">Remaining</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Activity className="w-5 h-5 mr-2" />
                          Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {currentChild.recentActivity.slice(0, 5).map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                              <div className="flex items-center gap-2">
                                {getActivityIcon(activity.type)}
                                <div>
                                  <p className="font-medium text-sm">{activity.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(activity.timestamp).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              {activity.score && (
                                <Badge variant="outline" className="text-xs">
                                  {activity.score}%
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Learning Stats */}
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Learning Analytics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Interactive charts coming soon...</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Track daily progress, time spent learning, and skill development over time
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="skills" className="flex-1 overflow-auto">
              {currentChild && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentChild.skills.map((skill) => (
                      <Card key={skill.name}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{skill.name}</h3>
                            <Badge className={getSkillColor(skill.category)}>
                              Level {skill.level}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress to Level {skill.level + 1}</span>
                              <span>{skill.progress}%</span>
                            </div>
                            <Progress value={skill.progress} />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Level {skill.level}</span>
                              <span>Level {skill.level + 1}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="achievements" className="flex-1 overflow-auto">
              {currentChild && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentChild.achievements.map((achievement) => (
                      <Card key={achievement.id} className="relative overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Trophy className="w-5 h-5 text-primary" />
                            </div>
                            <Badge className={getRarityColor(achievement.rarity)}>
                              {achievement.rarity}
                            </Badge>
                          </div>
                          <h3 className="font-medium">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Achievement Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">More achievements coming soon!</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Keep learning to unlock new badges and rewards
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="activity" className="flex-1 overflow-auto">
              {currentChild && (
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Detailed Activity Log
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {currentChild.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.score && (
                            <Badge variant="outline" className="mb-1">
                              {activity.score}%
                            </Badge>
                          )}
                          {activity.duration && (
                            <p className="text-xs text-muted-foreground">
                              {activity.duration} min
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="milestones" className="flex-1 overflow-auto">
              {currentChild && (
                <div className="space-y-4">
                  {currentChild.upcomingMilestones.map((milestone) => (
                    <Card key={milestone.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{milestone.title}</h3>
                            <p className="text-sm text-muted-foreground">{milestone.description}</p>
                          </div>
                          <Badge variant="outline">
                            {milestone.progress}/{milestone.target}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round((milestone.progress / milestone.target) * 100)}%</span>
                          </div>
                          <Progress value={(milestone.progress / milestone.target) * 100} />
                          <p className="text-xs text-muted-foreground">
                            Estimated completion: {new Date(milestone.estimatedCompletion).toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}