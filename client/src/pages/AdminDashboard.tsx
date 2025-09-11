import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  School,
  TrendingUp,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  GraduationCap,
  Globe
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Redirect if not an admin
  useEffect(() => {
    if (user && user?.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "This dashboard is for administrators only.",
        variant: "destructive",
      });
    }
  }, [user, toast]);

  // Fetch admin stats (mock implementation - would be real API calls)
  const { data: systemStats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/admin/stats'],
    queryFn: () => {
      // Mock data - in real implementation would call actual API
      return Promise.resolve({
        totalUsers: 152847,
        activeUsers: 89234,
        totalCourses: 45,
        totalSchools: 312,
        completedLessons: 1245632,
        avgProgress: 73,
        systemHealth: 'healthy',
        lastUpdated: new Date(),
      });
    },
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

  if (statsLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome-admin">
            Admin Dashboard
          </h1>
          <p className="text-primary-foreground/80">
            Monitor and manage the CodewiseHub platform
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* System Overview */}
          <div className="lg:col-span-3 space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card data-testid="card-total-users">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold" data-testid="stat-total-users">
                        {systemStats?.totalUsers.toLocaleString()}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-active-users">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold" data-testid="stat-active-users">
                        {systemStats?.activeUsers.toLocaleString()}
                      </p>
                    </div>
                    <UserCheck className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-total-schools">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Partner Schools</p>
                      <p className="text-2xl font-bold" data-testid="stat-partner-schools">
                        {systemStats?.totalSchools}
                      </p>
                    </div>
                    <School className="w-8 h-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-total-courses">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                      <p className="text-2xl font-bold" data-testid="stat-total-courses">
                        {systemStats?.totalCourses}
                      </p>
                    </div>
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card data-testid="card-system-health">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Database
                      </span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Healthy
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        API Services
                      </span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Online
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                        File Storage
                      </span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Warning
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Authentication
                      </span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Secure
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        CDN
                      </span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Optimized
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <XCircle className="w-4 h-4 text-red-500 mr-2" />
                        Email Service
                      </span>
                      <Badge variant="destructive">
                        Down
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card data-testid="card-recent-activity">
              <CardHeader>
                <CardTitle>Recent Platform Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">New school partnership: Johannesburg High School</p>
                        <p className="text-sm text-muted-foreground">150 students enrolled</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                        <BookOpen className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">New course published: Advanced AI for Teens</p>
                        <p className="text-sm text-muted-foreground">Available for Zimbabwe market</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">5 hours ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">Platform milestone: 1M+ lessons completed</p>
                        <p className="text-sm text-muted-foreground">Across both markets</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Tools Sidebar */}
          <div className="space-y-6">
            <Card data-testid="card-admin-tools">
              <CardHeader>
                <CardTitle>Admin Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-primary/5 hover:bg-primary/10"
                    data-testid="button-manage-users"
                  >
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    Manage Users
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-secondary/5 hover:bg-secondary/10"
                    data-testid="button-course-management"
                  >
                    <BookOpen className="w-4 h-4 mr-2 text-secondary" />
                    Course Management
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-accent/5 hover:bg-accent/10"
                    data-testid="button-school-partnerships"
                  >
                    <School className="w-4 h-4 mr-2 text-accent" />
                    School Partnerships
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-muted/5 hover:bg-muted/10"
                    data-testid="button-analytics"
                  >
                    <BarChart3 className="w-4 h-4 mr-2 text-muted-foreground" />
                    Analytics & Reports
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-700"
                    data-testid="button-system-settings"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Market Distribution */}
            <Card data-testid="card-market-distribution">
              <CardHeader>
                <CardTitle>Market Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm">South Africa</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">68%</p>
                      <p className="text-xs text-muted-foreground">103,856 users</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-secondary mr-2" />
                      <span className="text-sm">Zimbabwe</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">32%</p>
                      <p className="text-xs text-muted-foreground">48,991 users</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card data-testid="card-quick-actions">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    className="w-full"
                    data-testid="button-backup-database"
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Backup Database
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    data-testid="button-send-announcement"
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    data-testid="button-maintenance-mode"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Maintenance Mode
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
