import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useMarket } from "@/contexts/MarketContext";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  Search,
  Filter,
  Play,
  Lock,
  CheckCircle,
  Trophy,
  Code,
  Bot,
  Palette,
  Globe,
  Zap
} from "lucide-react";
import { Link } from "wouter";

export default function Courses() {
  const { user } = useAuth();
  const { market } = useMarket();
  const { toast } = useToast();
  const [ageFilter, setAgeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access courses.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [user, toast]);

  // Fetch courses based on market and filters
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['/api/courses', market, ageFilter !== 'all' ? ageFilter : undefined],
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

  // Fetch user progress
  const { data: userProgress } = useQuery({
    queryKey: ['/api/progress'],
    retry: false,
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  if (coursesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  const getCourseIcon = (title: string) => {
    if (title.toLowerCase().includes('python') || title.toLowerCase().includes('javascript')) {
      return <Code className="w-6 h-6" />;
    }
    if (title.toLowerCase().includes('robot') || title.toLowerCase().includes('micro:bit')) {
      return <Bot className="w-6 h-6" />;
    }
    if (title.toLowerCase().includes('web') || title.toLowerCase().includes('html')) {
      return <Globe className="w-6 h-6" />;
    }
    if (title.toLowerCase().includes('game') || title.toLowerCase().includes('creative')) {
      return <Palette className="w-6 h-6" />;
    }
    if (title.toLowerCase().includes('ai') || title.toLowerCase().includes('machine')) {
      return <Zap className="w-6 h-6" />;
    }
    return <BookOpen className="w-6 h-6" />;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCourseProgress = (courseId: string) => {
    if (!userProgress) return 0;
    const courseProgress = userProgress.filter(p => p.courseId === courseId);
    if (courseProgress.length === 0) return 0;
    
    const totalProgress = courseProgress.reduce((sum, p) => sum + p.progress, 0);
    return Math.round(totalProgress / courseProgress.length);
  };

  // Filter courses based on search and age
  const filteredCourses = courses?.filter(course => {
    const matchesSearch = searchTerm === '' || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAge = ageFilter === 'all' || course.ageGroup === ageFilter;
    
    return matchesSearch && matchesAge;
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-courses-title">
            Explore Courses
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl">
            Discover age-appropriate coding courses designed for your learning journey. 
            From visual programming to advanced development.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-courses"
              />
            </div>
          </div>
          
          <Select value={ageFilter} onValueChange={setAgeFilter} data-testid="select-age-filter">
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by age" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="6-11">Ages 6-11</SelectItem>
              <SelectItem value="12-17">Ages 12-17</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Categories */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" data-testid="category-programming">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Programming</h3>
              <p className="text-sm text-muted-foreground">Python, JavaScript, HTML/CSS</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" data-testid="category-robotics">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Bot className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-1">Robotics</h3>
              <p className="text-sm text-muted-foreground">micro:bit, Arduino, IoT</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" data-testid="category-web-dev">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-1">Web Development</h3>
              <p className="text-sm text-muted-foreground">Websites, Apps, APIs</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" data-testid="category-ai">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-1">AI & Machine Learning</h3>
              <p className="text-sm text-muted-foreground">Artificial Intelligence Basics</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              const progress = getCourseProgress(course.id);
              const isCompleted = progress >= 100;
              const isStarted = progress > 0;

              return (
                <Card key={course.id} className="feature-card" data-testid={`course-${course.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                          {getCourseIcon(course.title)}
                        </div>
                        <div>
                          <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{course.ageGroup}</p>
                        </div>
                      </div>
                      {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`text-xs border ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>8 lessons</span>
                      </div>
                    </div>

                    {isStarted && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      variant={isStarted ? "default" : "outline"}
                      data-testid={`button-${isStarted ? 'continue' : 'start'}-course`}
                    >
                      {isCompleted ? (
                        <>
                          <Trophy className="w-4 h-4 mr-2" />
                          Review Course
                        </>
                      ) : isStarted ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Start Course
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? 
                  `No courses match "${searchTerm}". Try different keywords.` :
                  `No courses available for the selected age group in ${market === 'zimbabwe' ? 'Zimbabwe' : 'South Africa'}.`
                }
              </p>
              {searchTerm && (
                <Button onClick={() => setSearchTerm('')} data-testid="button-clear-search">
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Learning Path Recommendation */}
        {user?.role === 'student' && (
          <Card className="mt-12" data-testid="card-learning-recommendation">
            <CardHeader>
              <CardTitle>Recommended Learning Path</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center p-4 bg-primary/5 rounded-lg border">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Start with Blocks</h4>
                    <p className="text-sm text-muted-foreground">Visual programming basics</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-secondary/5 rounded-lg border">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-secondary">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Learn Python</h4>
                    <p className="text-sm text-muted-foreground">Text-based programming</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-accent/5 rounded-lg border">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-accent">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Build Projects</h4>
                    <p className="text-sm text-muted-foreground">Apply your skills</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
