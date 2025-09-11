import { useEffect, useState } from 'react';
import type { User } from '@shared/schema';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Users, 
  Trophy, 
  Clock, 
  BookOpen,
  Settings,
  BarChart3,
  Shield,
  FileText,
  Calendar,
  Eye,
  MessageSquare,
  Activity
} from "lucide-react";

// Import embedded applications
import { ChildProgressModal } from "@/components/ChildProgressModal";
import { CommunicationHubModal } from "@/components/CommunicationHubModal";
import { LearningReportsModal } from "@/components/LearningReportsModal";
import { SafetyDashboardModal } from "@/components/SafetyDashboardModal";

export default function ParentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Modal state management
  const [childProgressOpen, setChildProgressOpen] = useState(false);
  const [communicationHubOpen, setCommunicationHubOpen] = useState(false);
  const [learningReportsOpen, setLearningReportsOpen] = useState(false);
  const [safetyDashboardOpen, setSafetyDashboardOpen] = useState(false);

  // Redirect if not a parent
  useEffect(() => {
    if (user && user?.role !== 'parent') {
      toast({
        title: "Access Denied",
        description: "This dashboard is for parents only.",
        variant: "destructive",
      });
    }
  }, [user, toast]);

  // Fetch children
  const { data: children, isLoading: childrenLoading } = useQuery<User[]>({
    queryKey: ['/api/parent/children'],
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

  if (childrenLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading parent dashboard...</p>
        </div>
      </div>
    );
  }

  const totalLessonsThisWeek = 16; // Mock data
  const projectsCompleted = 4; // Mock data
  const dailyScreenTime = 45; // Mock data

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome-parent">
            Welcome, {user?.firstName || 'Parent'}!
          </h1>
          <p className="text-primary-foreground/80">
            Monitor your child's coding journey and learning progress
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Child Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card data-testid="card-child-progress">
              <CardHeader>
                <CardTitle>Your Child's Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary" data-testid="stat-lessons-week">
                      {totalLessonsThisWeek}
                    </div>
                    <div className="text-sm text-muted-foreground">Lessons This Week</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent" data-testid="stat-projects-completed">
                      {projectsCompleted}
                    </div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary" data-testid="stat-screen-time">
                      {dailyScreenTime} min
                    </div>
                    <div className="text-sm text-muted-foreground">Daily Screen Time</div>
                  </div>
                </div>

                {/* Children List */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Children</h3>
                  {children && children.length > 0 ? (
                    children.map((child, index) => (
                      <div 
                        key={child.id} 
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                        data-testid={`child-${index}`}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {child.firstName} {child.lastName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Last active: Today
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Button size="sm" variant="outline" data-testid={`button-view-child-${index}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Progress
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No children linked to this account</p>
                      <Button className="mt-4" data-testid="button-link-child">
                        Link Child Account
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card data-testid="card-recent-activities">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <Trophy className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Completed Python Basics</h3>
                        <p className="text-sm text-muted-foreground">Earned certification badge</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">Yesterday</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                        <BookOpen className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium">Built First Robot</h3>
                        <p className="text-sm text-muted-foreground">micro:bit LED display project</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                        <Clock className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-medium">7-Day Coding Streak</h3>
                        <p className="text-sm text-muted-foreground">Consistent daily practice achievement</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Parent Controls */}
          <div className="space-y-6">
            <Card data-testid="card-parental-controls">
              <CardHeader>
                <CardTitle>Parental Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Daily Time Limit</span>
                    <Select defaultValue="45">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                        <SelectItem value="120">120 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Content Level</span>
                    <Select defaultValue="age-appropriate">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="age-appropriate">Age Appropriate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="restricted">Restricted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Weekend Access</span>
                    <Select defaultValue="enabled">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="limited">Limited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20" 
                    variant="outline"
                    data-testid="button-generate-report"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Weekly Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card data-testid="card-parent-actions">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-primary/5 hover:bg-primary/10"
                    onClick={() => setChildProgressOpen(true)}
                    data-testid="button-view-detailed-progress"
                  >
                    <BarChart3 className="w-4 h-4 mr-2 text-primary" />
                    Child Progress Analytics
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-secondary/5 hover:bg-secondary/10"
                    onClick={() => setCommunicationHubOpen(true)}
                    data-testid="button-schedule-session"
                  >
                    <MessageSquare className="w-4 h-4 mr-2 text-secondary" />
                    Communication Hub
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-accent/5 hover:bg-accent/10"
                    onClick={() => setSafetyDashboardOpen(true)}
                    data-testid="button-safety-settings"
                  >
                    <Shield className="w-4 h-4 mr-2 text-accent" />
                    Safety Dashboard
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-green-50 hover:bg-green-100 text-green-700"
                    onClick={() => setLearningReportsOpen(true)}
                    data-testid="button-contact-teacher"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Learning Reports
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Learning Summary */}
            <Card data-testid="card-learning-summary">
              <CardHeader>
                <CardTitle>This Week's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Screen Time</span>
                    <span className="font-medium">4h 35m</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Lessons Completed</span>
                    <span className="font-medium">16</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Achievements Earned</span>
                    <span className="font-medium">3</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Favorite Subject</span>
                    <span className="font-medium">Robotics</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Embedded Applications */}
      <ChildProgressModal 
        isOpen={childProgressOpen} 
        onClose={() => setChildProgressOpen(false)} 
      />
      <CommunicationHubModal 
        isOpen={communicationHubOpen} 
        onClose={() => setCommunicationHubOpen(false)} 
      />
      <LearningReportsModal 
        isOpen={learningReportsOpen} 
        onClose={() => setLearningReportsOpen(false)} 
      />
      <SafetyDashboardModal 
        isOpen={safetyDashboardOpen} 
        onClose={() => setSafetyDashboardOpen(false)} 
      />
    </div>
  );
}
