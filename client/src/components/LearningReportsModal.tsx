import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Award,
  BookOpen,
  Star,
  Activity,
  CheckCircle,
  AlertTriangle,
  Users,
  Trophy,
  Brain,
  Zap,
  Eye,
  Share2,
  Printer
} from "lucide-react";

interface LearningReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Report {
  id: string;
  title: string;
  type: 'weekly' | 'monthly' | 'quarterly' | 'annual';
  period: string;
  generatedAt: string;
  status: 'ready' | 'generating' | 'archived';
  summary: ReportSummary;
  achievements: Achievement[];
  recommendations: string[];
}

interface ReportSummary {
  totalLessons: number;
  completedLessons: number;
  totalHours: number;
  averageGrade: number;
  skillsImproved: number;
  projectsCompleted: number;
  streakDays: number;
  topSkills: string[];
  challengingAreas: string[];
}

interface Achievement {
  title: string;
  date: string;
  description: string;
  category: 'skill' | 'milestone' | 'streak' | 'project';
}

interface SkillProgress {
  skill: string;
  currentLevel: number;
  previousLevel: number;
  progress: number;
  trend: 'up' | 'down' | 'stable';
}

export function LearningReportsModal({ isOpen, onClose }: LearningReportsModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly");
  const [selectedReport, setSelectedReport] = useState<string>("march-2024");
  const [viewMode, setViewMode] = useState<string>("summary");

  // Mock data
  const reports: Report[] = [
    {
      id: "march-2024",
      title: "March 2024 Learning Report",
      type: "monthly",
      period: "March 1-31, 2024",
      generatedAt: "2024-03-31T23:59:59Z",
      status: "ready",
      summary: {
        totalLessons: 20,
        completedLessons: 18,
        totalHours: 45,
        averageGrade: 94,
        skillsImproved: 5,
        projectsCompleted: 3,
        streakDays: 12,
        topSkills: ["Python Programming", "Problem Solving", "Logic"],
        challengingAreas: ["Debugging", "Object-Oriented Programming"]
      },
      achievements: [
        {
          title: "Python Expert",
          date: "2024-03-15",
          description: "Mastered Python fundamentals with 95% average score",
          category: "skill"
        },
        {
          title: "Project Pioneer",
          date: "2024-03-22",
          description: "Completed first major coding project - Calculator App",
          category: "project"
        },
        {
          title: "Consistency Champion",
          date: "2024-03-28",
          description: "Maintained 12-day learning streak",
          category: "streak"
        }
      ],
      recommendations: [
        "Continue with advanced Python topics like classes and inheritance",
        "Practice debugging skills with interactive exercises",
        "Consider exploring web development as the next learning path",
        "Join the coding club to collaborate with peers on projects"
      ]
    },
    {
      id: "february-2024",
      title: "February 2024 Learning Report", 
      type: "monthly",
      period: "February 1-29, 2024",
      generatedAt: "2024-02-29T23:59:59Z",
      status: "ready",
      summary: {
        totalLessons: 18,
        completedLessons: 16,
        totalHours: 38,
        averageGrade: 89,
        skillsImproved: 4,
        projectsCompleted: 2,
        streakDays: 8,
        topSkills: ["Basic Programming", "Logic", "Creativity"],
        challengingAreas: ["Syntax", "Variables", "Functions"]
      },
      achievements: [
        {
          title: "First Code",
          date: "2024-02-05",
          description: "Successfully wrote and ran first Python program",
          category: "milestone"
        },
        {
          title: "Logic Master",
          date: "2024-02-18",
          description: "Solved 20 logic puzzles with perfect scores",
          category: "skill"
        }
      ],
      recommendations: [
        "Focus on strengthening syntax knowledge with practice exercises",
        "Work on understanding variable types and scope",
        "Practice writing functions with different parameters",
        "Continue building confidence with small projects"
      ]
    }
  ];

  const skillsProgress: SkillProgress[] = [
    { skill: "Python Programming", currentLevel: 8, previousLevel: 6, progress: 85, trend: "up" },
    { skill: "Problem Solving", currentLevel: 9, previousLevel: 7, progress: 90, trend: "up" },
    { skill: "Logic & Reasoning", currentLevel: 8, previousLevel: 8, progress: 75, trend: "stable" },
    { skill: "Creative Thinking", currentLevel: 7, previousLevel: 6, progress: 65, trend: "up" },
    { skill: "Debugging", currentLevel: 5, previousLevel: 6, progress: 45, trend: "down" }
  ];

  const currentReport = reports.find(r => r.id === selectedReport);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'skill':
        return <Brain className="w-4 h-4" />;
      case 'milestone':
        return <Target className="w-4 h-4" />;
      case 'streak':
        return <Zap className="w-4 h-4" />;
      case 'project':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'skill':
        return 'bg-blue-100 text-blue-800';
      case 'milestone':
        return 'bg-green-100 text-green-800';
      case 'streak':
        return 'bg-yellow-100 text-yellow-800';
      case 'project':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadReport = () => {
    console.log("Downloading report:", selectedReport);
  };

  const handleShareReport = () => {
    console.log("Sharing report:", selectedReport);
  };

  const handlePrintReport = () => {
    console.log("Printing report:", selectedReport);
  };

  const progressPercentage = currentReport ? Math.round((currentReport.summary.completedLessons / currentReport.summary.totalLessons) * 100) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Learning Reports & Analytics
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[85vh]">
          <div className="flex items-center gap-4 mb-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly Reports</SelectItem>
                <SelectItem value="monthly">Monthly Reports</SelectItem>
                <SelectItem value="quarterly">Quarterly Reports</SelectItem>
                <SelectItem value="annual">Annual Reports</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reports.map((report) => (
                  <SelectItem key={report.id} value={report.id}>
                    {report.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" onClick={handleShareReport} data-testid="button-share-report">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" onClick={handlePrintReport} data-testid="button-print-report">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button onClick={handleDownloadReport} data-testid="button-download-report">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <Tabs defaultValue="summary" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="flex-1 overflow-auto">
              {currentReport && (
                <div className="space-y-6">
                  {/* Report Header */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{currentReport.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Period: {currentReport.period}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{currentReport.type}</Badge>
                          <Badge variant="secondary">Ready</Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                            <p className="text-2xl font-bold">{progressPercentage}%</p>
                          </div>
                          <Target className="w-8 h-8 text-primary" />
                        </div>
                        <Progress value={progressPercentage} className="mt-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {currentReport.summary.completedLessons}/{currentReport.summary.totalLessons} lessons
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
                            <p className="text-2xl font-bold">{currentReport.summary.averageGrade}%</p>
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
                            <p className="text-2xl font-bold">{currentReport.summary.totalHours}h</p>
                          </div>
                          <Clock className="w-8 h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Streak Days</p>
                            <p className="text-2xl font-bold">{currentReport.summary.streakDays}</p>
                          </div>
                          <Zap className="w-8 h-8 text-orange-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                          Strengths & Top Skills
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {currentReport.summary.topSkills.map((skill, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                              <span className="text-sm font-medium">{skill}</span>
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Excellent
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Areas for Improvement */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                          Areas for Growth
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {currentReport.summary.challengingAreas.map((area, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                              <span className="text-sm font-medium">{area}</span>
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                Focus Area
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Monthly Highlights */}
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Monthly Highlights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-muted/30 rounded-lg">
                            <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                            <p className="text-2xl font-bold">{currentReport.summary.projectsCompleted}</p>
                            <p className="text-sm text-muted-foreground">Projects Completed</p>
                          </div>
                          <div className="text-center p-4 bg-muted/30 rounded-lg">
                            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                            <p className="text-2xl font-bold">{currentReport.achievements.length}</p>
                            <p className="text-sm text-muted-foreground">New Achievements</p>
                          </div>
                          <div className="text-center p-4 bg-muted/30 rounded-lg">
                            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <p className="text-2xl font-bold">{currentReport.summary.skillsImproved}</p>
                            <p className="text-sm text-muted-foreground">Skills Improved</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="progress" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Learning Progress Charts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive progress charts coming soon...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Visualize learning patterns, completion rates, and grade trends over time
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="flex-1 overflow-auto">
              {currentReport && (
                <div className="space-y-4">
                  {currentReport.achievements.map((achievement, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(achievement.category)}`}>
                              {getCategoryIcon(achievement.category)}
                            </div>
                            <div>
                              <h3 className="font-medium">{achievement.title}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Earned on {new Date(achievement.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Badge className={getCategoryColor(achievement.category)}>
                            {achievement.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {currentReport.achievements.length === 0 && (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No new achievements this period</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Keep learning to unlock new badges and milestones!
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="skills" className="flex-1 overflow-auto">
              <div className="space-y-4">
                {skillsProgress.map((skill, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{skill.skill}</h3>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(skill.trend)}
                          <Badge variant="outline">
                            Level {skill.currentLevel}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to Level {skill.currentLevel + 1}</span>
                          <span>{skill.progress}%</span>
                        </div>
                        <Progress value={skill.progress} />
                        
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Previous: Level {skill.previousLevel}</span>
                          <span>Current: Level {skill.currentLevel}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="flex-1 overflow-auto">
              {currentReport && (
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Personalized Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentReport.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-xs font-medium text-primary">{index + 1}</span>
                          </div>
                          <p className="text-sm">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
                      <p className="text-sm text-blue-800">
                        Based on Emily's progress, we recommend focusing on debugging skills while continuing 
                        to build on her strong foundation in Python programming. Consider enrolling in the 
                        intermediate web development track to expand her skillset.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}