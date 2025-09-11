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
  Users, 
  Clock, 
  Target,
  Award,
  BookOpen,
  Calendar,
  Eye,
  Download,
  Filter,
  CheckCircle,
  AlertTriangle,
  Activity
} from "lucide-react";

interface StudentAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StudentData {
  id: string;
  name: string;
  email: string;
  totalHours: number;
  completedLessons: number;
  totalLessons: number;
  averageGrade: number;
  lastActive: string;
  progressTrend: 'up' | 'down' | 'stable';
  achievements: number;
  currentCourse: string;
  strugglingAreas: string[];
  strengths: string[];
}

interface ActivityData {
  date: string;
  hours: number;
  lessonsCompleted: number;
  averageScore: number;
}

export function StudentAnalyticsModal({ isOpen, onClose }: StudentAnalyticsModalProps) {
  const [selectedStudent, setSelectedStudent] = useState<string>("emily-chen");
  const [timeRange, setTimeRange] = useState<string>("30d");
  const [viewMode, setViewMode] = useState<string>("individual");

  // Mock data
  const students: StudentData[] = [
    {
      id: "emily-chen",
      name: "Emily Chen",
      email: "emily.chen@school.edu",
      totalHours: 124,
      completedLessons: 32,
      totalLessons: 40,
      averageGrade: 94,
      lastActive: "2024-03-15T14:30:00Z",
      progressTrend: "up",
      achievements: 12,
      currentCourse: "Advanced Python",
      strugglingAreas: ["Debugging", "Object-Oriented Programming"],
      strengths: ["Logic", "Problem Solving", "Syntax"]
    },
    {
      id: "marcus-johnson",
      name: "Marcus Johnson", 
      email: "marcus.johnson@school.edu",
      totalHours: 98,
      completedLessons: 28,
      totalLessons: 40,
      averageGrade: 87,
      lastActive: "2024-03-15T10:15:00Z",
      progressTrend: "stable",
      achievements: 9,
      currentCourse: "Web Development",
      strugglingAreas: ["CSS Styling", "Responsive Design"],
      strengths: ["HTML Structure", "JavaScript Basics"]
    },
    {
      id: "sofia-rodriguez",
      name: "Sofia Rodriguez",
      email: "sofia.rodriguez@school.edu", 
      totalHours: 156,
      completedLessons: 38,
      totalLessons: 40,
      averageGrade: 91,
      lastActive: "2024-03-15T16:45:00Z",
      progressTrend: "up",
      achievements: 15,
      currentCourse: "Game Development",
      strugglingAreas: ["Game Physics"],
      strengths: ["Creative Design", "Animation", "User Interface"]
    },
    {
      id: "alex-kim",
      name: "Alex Kim",
      email: "alex.kim@school.edu",
      totalHours: 67,
      completedLessons: 18,
      totalLessons: 40,
      averageGrade: 76,
      lastActive: "2024-03-13T09:20:00Z",
      progressTrend: "down",
      achievements: 5,
      currentCourse: "Python Basics",
      strugglingAreas: ["Variables", "Functions", "Loops"],
      strengths: ["Enthusiasm", "Creativity"]
    }
  ];

  const currentStudent = students.find(s => s.id === selectedStudent);

  // Mock activity data for charts
  const activityData: ActivityData[] = [
    { date: "2024-03-08", hours: 3.5, lessonsCompleted: 2, averageScore: 92 },
    { date: "2024-03-09", hours: 2.8, lessonsCompleted: 1, averageScore: 88 },
    { date: "2024-03-10", hours: 4.2, lessonsCompleted: 3, averageScore: 95 },
    { date: "2024-03-11", hours: 3.1, lessonsCompleted: 2, averageScore: 89 },
    { date: "2024-03-12", hours: 5.0, lessonsCompleted: 4, averageScore: 97 },
    { date: "2024-03-13", hours: 2.3, lessonsCompleted: 1, averageScore: 84 },
    { date: "2024-03-14", hours: 3.7, lessonsCompleted: 2, averageScore: 91 }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-green-500";
    if (progress >= 80) return "bg-blue-500";
    if (progress >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

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

  const classStats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => {
      const lastActive = new Date(s.lastActive);
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      return lastActive > twoDaysAgo;
    }).length,
    averageProgress: Math.round(students.reduce((acc, s) => acc + (s.completedLessons / s.totalLessons * 100), 0) / students.length),
    averageGrade: Math.round(students.reduce((acc, s) => acc + s.averageGrade, 0) / students.length)
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Student Analytics Dashboard
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[85vh]">
          <div className="flex items-center gap-4 mb-4">
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual Student</SelectItem>
                <SelectItem value="class">Class Overview</SelectItem>
                <SelectItem value="comparison">Student Comparison</SelectItem>
              </SelectContent>
            </Select>

            {viewMode === "individual" && (
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger className="w-64">
                  <Users className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

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

            <Button variant="outline" className="ml-auto" data-testid="button-export-analytics">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="flex-1 overflow-auto">
              {viewMode === "individual" && currentStudent ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Progress</p>
                          <p className="text-2xl font-bold">
                            {Math.round((currentStudent.completedLessons / currentStudent.totalLessons) * 100)}%
                          </p>
                        </div>
                        <div className="flex items-center">
                          {getTrendIcon(currentStudent.progressTrend)}
                          <Target className="w-8 h-8 text-primary ml-2" />
                        </div>
                      </div>
                      <Progress 
                        value={(currentStudent.completedLessons / currentStudent.totalLessons) * 100} 
                        className="mt-2" 
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
                          <p className="text-2xl font-bold">{currentStudent.averageGrade}%</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-secondary" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                          <p className="text-2xl font-bold">{currentStudent.totalHours}h</p>
                        </div>
                        <Clock className="w-8 h-8 text-accent" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                          <p className="text-2xl font-bold">{currentStudent.achievements}</p>
                        </div>
                        <Award className="w-8 h-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                          <p className="text-2xl font-bold">{classStats.totalStudents}</p>
                        </div>
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                          <p className="text-2xl font-bold">{classStats.activeStudents}</p>
                        </div>
                        <Activity className="w-8 h-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Class Average</p>
                          <p className="text-2xl font-bold">{classStats.averageGrade}%</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-secondary" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                          <p className="text-2xl font-bold">{classStats.averageProgress}%</p>
                        </div>
                        <Target className="w-8 h-8 text-accent" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {viewMode === "individual" && currentStudent ? (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>Student Profile</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{currentStudent.name}</span>
                          <Badge variant="outline">{currentStudent.currentCourse}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {currentStudent.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                          Last active: {new Date(currentStudent.lastActive).toLocaleString()}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Lessons completed:</span>
                          <span className="font-medium">
                            {currentStudent.completedLessons}/{currentStudent.totalLessons}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Strengths & Areas for Improvement</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Strengths
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {currentStudent.strengths.map((strength, index) => (
                              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                            Areas for Improvement
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {currentStudent.strugglingAreas.map((area, index) => (
                              <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>Student Rankings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {students
                            .sort((a, b) => b.averageGrade - a.averageGrade)
                            .map((student, index) => (
                              <div key={student.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                                <div className="flex items-center">
                                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium mr-3">
                                    {index + 1}
                                  </span>
                                  <span className="font-medium">{student.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{student.averageGrade}%</span>
                                  {getTrendIcon(student.progressTrend)}
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Class Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Activity chart coming soon...</p>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Performance charts coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Engagement analytics coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>AI-Powered Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">AI insights coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}