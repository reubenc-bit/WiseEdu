import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Code, 
  Bot, 
  Trophy, 
  Star, 
  Play, 
  Plus, 
  BookOpen,
  Target,
  Clock,
  Award
} from "lucide-react";
import { Link } from "wouter";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch user progress
  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ['/api/progress'],
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

  // Fetch user projects
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
    retry: false,
  });

  // Fetch user achievements
  const { data: achievements, isLoading: achievementsLoading } = useQuery({
    queryKey: ['/api/achievements'],
    retry: false,
  });

  if (progressLoading || projectsLoading || achievementsLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const completedLessons = progress?.filter(p => p.completed).length || 0;
  const totalProjects = projects?.length || 0;
  const totalAchievements = achievements?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome">
            Welcome back, {user?.firstName || 'Student'}!
          </h1>
          <p className="text-primary-foreground/80">
            Continue your coding journey and explore new challenges
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Progress Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card data-testid="card-progress-overview">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary" data-testid="stat-lessons-completed">
                      {completedLessons}
                    </div>
                    <div className="text-sm text-muted-foreground">Lessons Completed</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent" data-testid="stat-projects-built">
                      {totalProjects}
                    </div>
                    <div className="text-sm text-muted-foreground">Projects Built</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary" data-testid="stat-badges-earned">
                      {totalAchievements}
                    </div>
                    <div className="text-sm text-muted-foreground">Badges Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Paths */}
            <Card data-testid="card-learning-paths">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Learning Paths</CardTitle>
                  <Link href="/courses">
                    <Button variant="outline" size="sm" data-testid="button-learn-more-courses">
                      Learn More About Courses
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progress && progress.length > 0 ? (
                    progress.slice(0, 3).map((progressItem, index) => (
                      <div 
                        key={progressItem.id} 
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                        data-testid={`learning-path-${index}`}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <Code className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Course {progressItem.courseId}</h3>
                            <p className="text-sm text-muted-foreground">Lesson {progressItem.lessonId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{progressItem.progress}% Complete</div>
                          <Progress value={progressItem.progress} className="w-16 h-2 mt-1" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No learning paths started yet</p>
                      <Link href="/courses">
                        <Button className="mt-4" data-testid="button-start-first-course">
                          Start Your First Course
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <Card data-testid="card-achievements">
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements && achievements.length > 0 ? (
                    achievements.slice(0, 3).map((achievement, index) => (
                      <div key={achievement.id} className="flex items-center" data-testid={`achievement-${index}`}>
                        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                          <Trophy className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{achievement.achievement.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(achievement.earnedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <Award className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No achievements yet</p>
                      <p className="text-xs text-muted-foreground">Complete lessons to earn badges!</p>
                    </div>
                  )}
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
                  <Link href="/courses">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start bg-primary/5 hover:bg-primary/10"
                      data-testid="button-continue-lesson"
                    >
                      <Play className="w-4 h-4 mr-2 text-primary" />
                      Continue Last Lesson
                    </Button>
                  </Link>
                  
                  <Link href="/coding-hub">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start bg-secondary/5 hover:bg-secondary/10"
                      data-testid="button-new-project"
                    >
                      <Plus className="w-4 h-4 mr-2 text-secondary" />
                      Start New Project
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-accent/5 hover:bg-accent/10"
                    data-testid="button-ai-help"
                  >
                    <Bot className="w-4 h-4 mr-2 text-accent" />
                    Ask AI Tutor
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
