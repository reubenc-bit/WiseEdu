import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Award, 
  FileText, 
  Settings,
  Calendar,
  Target,
  TrendingUp,
  Clock
} from "lucide-react";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Redirect if not a teacher
  useEffect(() => {
    if (user && user?.role !== 'teacher') {
      toast({
        title: "Access Denied",
        description: "This dashboard is for teachers only.",
        variant: "destructive",
      });
    }
  }, [user, toast]);

  // Fetch students
  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ['/api/teacher/students'],
    retry: false,
    meta: {
      onError: (error: Error) => {
        if (isUnauthorizedError(error)) {
          toast({
            title: "Unauthorized",
            description: "You are logged out. Logging in again...",
            variant: "destructive",
          });
          setTimeout(() => {
            window.location.href = "/api/login";
          }, 500);
        }
      }
    }
  });

  // Fetch certifications
  const { data: certifications, isLoading: certificationsLoading } = useQuery({
    queryKey: ['/api/teacher/certifications'],
    retry: false,
  });

  if (studentsLoading || certificationsLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading teacher dashboard...</p>
        </div>
      </div>
    );
  }

  const activeStudents = students?.length || 0;
  const totalClasses = 3; // Mock data
  const avgProgress = 85; // Mock data

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome-teacher">
            Welcome, {user?.firstName || 'Teacher'}!
          </h1>
          <p className="text-primary-foreground/80">
            Manage your classes and continue your professional development
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Class Management */}
          <div className="lg:col-span-2 space-y-6">
            <Card data-testid="card-class-overview">
              <CardHeader>
                <CardTitle>Class Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary" data-testid="stat-active-students">
                      {activeStudents}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Students</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent" data-testid="stat-classes">
                      {totalClasses}
                    </div>
                    <div className="text-sm text-muted-foreground">Classes</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary" data-testid="stat-avg-progress">
                      {avgProgress}%
                    </div>
                    <div className="text-sm text-muted-foreground">Avg. Progress</div>
                  </div>
                </div>

                {/* Student List */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Recent Student Activity</h3>
                  {students && students.length > 0 ? (
                    students.slice(0, 5).map((student, index) => (
                      <div 
                        key={student.id} 
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                        data-testid={`student-${index}`}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <Users className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {student.firstName} {student.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Active</div>
                          <div className="text-xs text-muted-foreground">Last seen today</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No students enrolled yet</p>
                      <Button className="mt-4" data-testid="button-invite-students">
                        Invite Students
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Professional Development */}
            <Card data-testid="card-professional-development">
              <CardHeader>
                <CardTitle>Professional Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-medium mb-2">AI in Education Certification</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn to integrate AI tools in your classroom
                    </p>
                    <div className="flex justify-between items-center">
                      <Progress value={60} className="flex-1 mr-4" />
                      <span className="text-sm text-muted-foreground">60% Complete</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-medium mb-2">Block-based Programming Workshop</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Teaching visual programming to young learners
                    </p>
                    <Button size="sm" data-testid="button-start-workshop">
                      Start Workshop
                    </Button>
                  </div>

                  {certifications && certifications.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">Your Certifications</h3>
                      <div className="space-y-2">
                        {certifications.map((cert, index) => (
                          <div 
                            key={cert.id} 
                            className="flex items-center justify-between p-3 bg-accent/10 rounded-lg"
                            data-testid={`certification-${index}`}
                          >
                            <div className="flex items-center">
                              <Award className="w-4 h-4 text-accent mr-2" />
                              <span className="font-medium">{cert.certificationName}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(cert.issueDate).getFullYear()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Teacher Tools */}
          <div className="space-y-6">
            <Card data-testid="card-quick-tools">
              <CardHeader>
                <CardTitle>Quick Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-primary/5 hover:bg-primary/10"
                    data-testid="button-create-assignment"
                  >
                    <FileText className="w-4 h-4 mr-2 text-primary" />
                    Create Assignment
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-secondary/5 hover:bg-secondary/10"
                    data-testid="button-view-progress"
                  >
                    <BarChart3 className="w-4 h-4 mr-2 text-secondary" />
                    Student Progress
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-accent/5 hover:bg-accent/10"
                    data-testid="button-access-resources"
                  >
                    <BookOpen className="w-4 h-4 mr-2 text-accent" />
                    Teaching Resources
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-muted/5 hover:bg-muted/10"
                    data-testid="button-schedule-class"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    Schedule Class
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Class Schedule */}
            <Card data-testid="card-schedule">
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                    <div>
                      <p className="font-medium">Grade 6 - Python Basics</p>
                      <p className="text-sm text-muted-foreground">Room 101</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">10:00 AM</p>
                      <p className="text-xs text-muted-foreground">45 min</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border-l-4 border-secondary bg-secondary/5 rounded-r-lg">
                    <div>
                      <p className="font-medium">Grade 8 - Web Development</p>
                      <p className="text-sm text-muted-foreground">Room 102</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">2:00 PM</p>
                      <p className="text-xs text-muted-foreground">60 min</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
