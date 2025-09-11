import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  BookOpen, 
  Video, 
  Calendar, 
  Users, 
  Award, 
  CheckCircle,
  Clock,
  Target,
  MessageSquare,
  FileText,
  Download,
  Play,
  User,
  GraduationCap,
  TrendingUp,
  Lightbulb,
  Settings,
  Star,
  ChevronRight,
  BarChart3
} from "lucide-react";

export default function EducatorTrainingDashboard() {
  const [activeModule, setActiveModule] = useState<any>(null);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);

  // Mock training data
  const trainingProgress = {
    currentProgram: "Advanced Educator Certification",
    overallProgress: 65,
    currentModule: "Module 4: Assessment & Evaluation Methods",
    nextDeadline: "Assignment due in 3 days",
    completedModules: 4,
    totalModules: 8,
    weeklyHours: 6,
    targetHours: 6
  };

  const modules = [
    {
      id: 1,
      title: "Educational Technology Foundations",
      status: "completed",
      progress: 100,
      duration: "2 weeks",
      resources: 12,
      assignments: 3
    },
    {
      id: 2,
      title: "Block-based Programming Pedagogy",
      status: "completed",
      progress: 100,
      duration: "3 weeks",
      resources: 15,
      assignments: 4
    },
    {
      id: 3,
      title: "Classroom Management for Tech",
      status: "completed", 
      progress: 100,
      duration: "2 weeks",
      resources: 10,
      assignments: 2
    },
    {
      id: 4,
      title: "Assessment & Evaluation Methods",
      status: "current",
      progress: 70,
      duration: "3 weeks",
      resources: 18,
      assignments: 5
    },
    {
      id: 5,
      title: "Student Progress Tracking",
      status: "upcoming",
      progress: 0,
      duration: "2 weeks",
      resources: 14,
      assignments: 3
    },
    {
      id: 6,
      title: "Parent-Teacher Communication",
      status: "upcoming",
      progress: 0,
      duration: "2 weeks",
      resources: 11,
      assignments: 2
    }
  ];

  const mentors = [
    {
      name: "Dr. Sarah Johnson",
      role: "Senior Coding Education Specialist",
      expertise: "Curriculum Development, Assessment",
      availability: "Available",
      nextSession: "Tomorrow 2:00 PM"
    },
    {
      name: "Prof. Michael Chen",
      role: "Robotics Education Expert",
      expertise: "Hardware Integration, Project-Based Learning",
      availability: "Busy until Friday",
      nextSession: "Friday 10:00 AM"
    }
  ];

  const upcomingEvents = [
    {
      type: "Live Workshop",
      title: "Advanced Assessment Techniques",
      date: "Tomorrow 3:00 PM",
      instructor: "Dr. Sarah Johnson",
      duration: "2 hours"
    },
    {
      type: "Peer Session",
      title: "Coding Project Showcase",
      date: "Thursday 4:00 PM", 
      instructor: "Fellow Educators",
      duration: "1.5 hours"
    },
    {
      type: "Office Hours",
      title: "Open Q&A with Mentors",
      date: "Friday 1:00 PM",
      instructor: "All Mentors",
      duration: "1 hour"
    }
  ];

  const ModuleDetailsModal = ({ module }: { module: any }) => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          {module?.title}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Progress value={module?.progress} className="mb-2" />
              <p className="text-sm font-medium">{module?.progress}% Complete</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">{module?.resources} Resources</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-accent" />
              <p className="text-sm font-medium">{module?.assignments} Assignments</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Learning Materials</h3>
          {[
            "Introduction to Assessment Methods (Video - 45 min)",
            "Rubric Design Guidelines (PDF - 12 pages)",
            "Interactive Assessment Tools (Demo)",
            "Case Studies in Student Evaluation (Article)"
          ].map((material, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center">
                <Play className="w-4 h-4 mr-3 text-primary" />
                <span className="text-sm">{material}</span>
              </div>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Access
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Assignments</h3>
          {[
            { title: "Design Assessment Rubric", due: "Due in 3 days", status: "pending" },
            { title: "Analyze Student Work Samples", due: "Due next week", status: "not_started" },
            { title: "Create Progress Tracking System", due: "Due in 2 weeks", status: "not_started" }
          ].map((assignment, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{assignment.title}</p>
                <p className="text-sm text-muted-foreground">{assignment.due}</p>
              </div>
              <Badge variant={assignment.status === 'pending' ? 'default' : 'secondary'}>
                {assignment.status === 'pending' ? 'In Progress' : 'Not Started'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome-educator">
            Educator Training Dashboard
          </h1>
          <p className="text-primary-foreground/80">
            Your journey to becoming a certified coding and robotics educator
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Progress Overview */}
            <Card data-testid="card-progress-overview">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Training Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary" data-testid="stat-overall-progress">
                      {trainingProgress.overallProgress}%
                    </div>
                    <div className="text-sm text-muted-foreground">Overall Progress</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent" data-testid="stat-completed-modules">
                      {trainingProgress.completedModules}/{trainingProgress.totalModules}
                    </div>
                    <div className="text-sm text-muted-foreground">Modules Complete</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary" data-testid="stat-weekly-hours">
                      {trainingProgress.weeklyHours}h
                    </div>
                    <div className="text-sm text-muted-foreground">This Week</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowProgressModal(true)}
                      data-testid="button-detailed-progress"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Current Program: {trainingProgress.currentProgram}</span>
                      <span className="text-sm text-muted-foreground">{trainingProgress.overallProgress}%</span>
                    </div>
                    <Progress value={trainingProgress.overallProgress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <div>
                      <p className="font-medium">Current Focus: {trainingProgress.currentModule}</p>
                      <p className="text-sm text-muted-foreground">{trainingProgress.nextDeadline}</p>
                    </div>
                    <Button size="sm" data-testid="button-continue-module">
                      Continue <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Modules */}
            <Card data-testid="card-learning-modules">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Learning Modules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div 
                      key={module.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover-elevate cursor-pointer"
                      onClick={() => setActiveModule(module)}
                      data-testid={`module-${module.id}`}
                    >
                      <div className="flex items-center flex-1">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                          {module.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : module.status === 'current' ? (
                            <Clock className="w-6 h-6 text-primary" />
                          ) : (
                            <BookOpen className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{module.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-muted-foreground">{module.duration}</span>
                            <span className="text-sm text-muted-foreground">{module.resources} resources</span>
                            <span className="text-sm text-muted-foreground">{module.assignments} assignments</span>
                          </div>
                          {module.status !== 'upcoming' && (
                            <Progress value={module.progress} className="mt-2 h-1" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={
                            module.status === 'completed' ? 'default' : 
                            module.status === 'current' ? 'secondary' : 'outline'
                          }
                        >
                          {module.status === 'completed' ? 'Complete' : 
                           module.status === 'current' ? 'In Progress' : 'Upcoming'}
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card data-testid="card-upcoming-events">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                      data-testid={`event-${index}`}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                          <Video className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">{event.type}</Badge>
                            <h3 className="font-medium">{event.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {event.date} • {event.duration} • {event.instructor}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" data-testid={`button-join-event-${index}`}>
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <Card data-testid="card-quick-actions">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-primary/5 hover:bg-primary/10"
                    onClick={() => setShowMentorModal(true)}
                    data-testid="button-connect-mentor"
                  >
                    <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                    Connect with Mentor
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-secondary/5 hover:bg-secondary/10"
                    onClick={() => setShowResourceModal(true)}
                    data-testid="button-download-resources"
                  >
                    <Download className="w-4 h-4 mr-2 text-secondary" />
                    Download Resources
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-accent/5 hover:bg-accent/10"
                    onClick={() => setShowCommunityModal(true)}
                    data-testid="button-join-community"
                  >
                    <Users className="w-4 h-4 mr-2 text-accent" />
                    Join Community
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-muted/5 hover:bg-muted/10"
                    data-testid="button-view-certificates"
                  >
                    <Award className="w-4 h-4 mr-2 text-muted-foreground" />
                    View Certificates
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mentors */}
            <Card data-testid="card-mentors">
              <CardHeader>
                <CardTitle>Your Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mentors.map((mentor, index) => (
                    <div key={index} className="space-y-2" data-testid={`mentor-${index}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{mentor.name}</p>
                            <p className="text-xs text-muted-foreground">{mentor.role}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground ml-11">
                        <p>Expertise: {mentor.expertise}</p>
                        <p>Next session: {mentor.nextSession}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="ml-11 text-xs"
                        data-testid={`button-contact-mentor-${index}`}
                      >
                        Schedule Meeting
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievement Summary */}
            <Card data-testid="card-achievements">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-sm">First Module Complete</span>
                    </div>
                    <Badge variant="secondary">Earned</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm">Quick Learner</span>
                    </div>
                    <Badge variant="secondary">Earned</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-accent mr-2" />
                      <span className="text-sm">Community Helper</span>
                    </div>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Module Details Modal */}
      <Dialog open={!!activeModule} onOpenChange={() => setActiveModule(null)}>
        <ModuleDetailsModal module={activeModule} />
      </Dialog>

      {/* Mentor Connection Modal */}
      <Dialog open={showMentorModal} onOpenChange={setShowMentorModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect with Your Mentors</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Schedule one-on-one sessions with your assigned mentors for personalized guidance.
            </p>
            {mentors.map((mentor, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{mentor.name}</p>
                      <p className="text-sm text-muted-foreground">{mentor.expertise}</p>
                      <p className="text-sm text-accent">{mentor.availability}</p>
                    </div>
                    <Button size="sm">Schedule</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Resource Download Modal */}
      <Dialog open={showResourceModal} onOpenChange={setShowResourceModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Training Resources</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Access and download all your training materials, templates, and reference guides.
            </p>
            <div className="space-y-2">
              {[
                "Complete Curriculum Guide (PDF)",
                "Assessment Templates (ZIP)",
                "Video Lesson Archives (Link)",
                "Student Activity Worksheets (PDF)"
              ].map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <span className="text-sm">{resource}</span>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Community Modal */}
      <Dialog open={showCommunityModal} onOpenChange={setShowCommunityModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join the Educator Community</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Connect with fellow educators, share experiences, and get support from the community.
            </p>
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Discussion Forums
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Study Groups
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Lightbulb className="w-4 h-4 mr-2" />
                Share Teaching Tips
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Progress Details Modal */}
      <Dialog open={showProgressModal} onOpenChange={setShowProgressModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detailed Progress Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{trainingProgress.overallProgress}%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent">{trainingProgress.weeklyHours}h</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Module Completion Timeline</h3>
              <div className="space-y-3">
                {modules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between">
                    <span className="text-sm">{module.title}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={module.progress} className="w-20 h-2" />
                      <span className="text-xs text-muted-foreground w-12">{module.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}