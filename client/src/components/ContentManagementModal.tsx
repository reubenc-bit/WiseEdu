import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Eye,
  Upload,
  Download,
  Copy,
  Settings,
  PlayCircle,
  FileText,
  Image,
  Video,
  Users,
  Calendar,
  Star,
  Clock,
  Target,
  Award,
  Globe,
  Lock,
  Unlock,
  Save,
  X
} from "lucide-react";

interface ContentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  lessons: number;
  enrollments: number;
  rating: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  market: string;
  price: number;
  tags: string[];
}

interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'video' | 'interactive' | 'quiz' | 'project';
  duration: number;
  order: number;
  isPublished: boolean;
  resources: Resource[];
  prerequisites: string[];
}

interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'image' | 'code' | 'link';
  url: string;
  size?: number;
}

export function ContentManagementModal({ isOpen, onClose }: ContentManagementModalProps) {
  const [activeTab, setActiveTab] = useState<string>("courses");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showCreateCourse, setShowCreateCourse] = useState<boolean>(false);
  const [showCreateLesson, setShowCreateLesson] = useState<boolean>(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "programming",
    difficulty: "beginner",
    market: "south-africa",
    price: 0,
    instructor: ""
  });

  // Mock data
  const courses: Course[] = [
    {
      id: "python-basics",
      title: "Python Programming Fundamentals",
      description: "Learn the basics of Python programming with hands-on exercises and projects.",
      instructor: "Sarah Johnson",
      category: "programming",
      difficulty: "beginner",
      duration: 240,
      lessons: 18,
      enrollments: 3247,
      rating: 4.8,
      isPublished: true,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-03-10T14:30:00Z",
      market: "south-africa",
      price: 299,
      tags: ["python", "programming", "beginners", "coding"]
    },
    {
      id: "web-dev-advanced",
      title: "Advanced Web Development",
      description: "Master modern web development with React, Node.js, and databases.",
      instructor: "Michael Chen",
      category: "web-development",
      difficulty: "advanced",
      duration: 480,
      lessons: 32,
      enrollments: 1847,
      rating: 4.9,
      isPublished: true,
      createdAt: "2024-02-01T09:00:00Z",
      updatedAt: "2024-03-12T16:45:00Z",
      market: "south-africa",
      price: 599,
      tags: ["react", "nodejs", "database", "advanced"]
    },
    {
      id: "game-dev-unity",
      title: "Game Development with Unity",
      description: "Create 2D and 3D games using Unity engine and C# programming.",
      instructor: "Alex Rodriguez",
      category: "game-development",
      difficulty: "intermediate",
      duration: 360,
      lessons: 24,
      enrollments: 892,
      rating: 4.6,
      isPublished: false,
      createdAt: "2024-03-01T11:30:00Z",
      updatedAt: "2024-03-14T09:15:00Z",
      market: "south-africa",
      price: 399,
      tags: ["unity", "csharp", "gamedev", "3d"]
    }
  ];

  const lessons: Lesson[] = [
    {
      id: "lesson-1",
      courseId: "python-basics",
      title: "Introduction to Python",
      description: "Learn what Python is and why it's popular for programming.",
      type: "video",
      duration: 15,
      order: 1,
      isPublished: true,
      resources: [
        { id: "res-1", name: "Python Installation Guide", type: "pdf", url: "/resources/python-install.pdf" },
        { id: "res-2", name: "Course Slides", type: "pdf", url: "/resources/intro-slides.pdf" }
      ],
      prerequisites: []
    },
    {
      id: "lesson-2",
      courseId: "python-basics",
      title: "Variables and Data Types",
      description: "Understanding variables, strings, numbers, and boolean values.",
      type: "interactive",
      duration: 25,
      order: 2,
      isPublished: true,
      resources: [
        { id: "res-3", name: "Practice Exercises", type: "code", url: "/code/variables-practice.py" },
        { id: "res-4", name: "Data Types Cheat Sheet", type: "pdf", url: "/resources/datatypes.pdf" }
      ],
      prerequisites: ["lesson-1"]
    }
  ];

  const categories = [
    { value: "programming", label: "Programming" },
    { value: "web-development", label: "Web Development" },
    { value: "game-development", label: "Game Development" },
    { value: "data-science", label: "Data Science" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "ai-machine-learning", label: "AI & Machine Learning" }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'code':
        return <FileText className="w-4 h-4" />;
      case 'link':
        return <Globe className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="w-4 h-4" />;
      case 'interactive':
        return <Target className="w-4 h-4" />;
      case 'quiz':
        return <Award className="w-4 h-4" />;
      case 'project':
        return <Settings className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description && newCourse.instructor) {
      // In a real app, this would create the course via API
      console.log("Creating course:", newCourse);
      setNewCourse({
        title: "",
        description: "",
        category: "programming",
        difficulty: "beginner",
        market: "south-africa",
        price: 0,
        instructor: ""
      });
      setShowCreateCourse(false);
    }
  };

  const handlePublishCourse = (courseId: string, publish: boolean) => {
    console.log(`${publish ? 'Publishing' : 'Unpublishing'} course:`, courseId);
  };

  const handleDeleteCourse = (courseId: string) => {
    console.log("Deleting course:", courseId);
  };

  const handleDuplicateCourse = (courseId: string) => {
    console.log("Duplicating course:", courseId);
  };

  const courseStats = {
    total: courses.length,
    published: courses.filter(c => c.isPublished).length,
    draft: courses.filter(c => !c.isPublished).length,
    totalEnrollments: courses.reduce((sum, c) => sum + c.enrollments, 0)
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Content Management System
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[85vh]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="flex-1 flex gap-4 overflow-hidden">
              {/* Course List */}
              <div className="w-2/3 flex flex-col">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                          <p className="text-2xl font-bold">{courseStats.total}</p>
                        </div>
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Published</p>
                          <p className="text-2xl font-bold">{courseStats.published}</p>
                        </div>
                        <Eye className="w-6 h-6 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                          <p className="text-2xl font-bold">{courseStats.draft}</p>
                        </div>
                        <Edit className="w-6 h-6 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Enrollments</p>
                          <p className="text-2xl font-bold">{courseStats.totalEnrollments.toLocaleString()}</p>
                        </div>
                        <Users className="w-6 h-6 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Filters */}
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search courses..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-48">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={() => setShowCreateCourse(true)} data-testid="button-create-course">
                        <Plus className="w-4 h-4 mr-2" />
                        New Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Course Grid */}
                <Card className="flex-1 overflow-hidden">
                  <CardContent className="p-0 h-full overflow-auto">
                    <div className="grid grid-cols-1 gap-4 p-4">
                      {filteredCourses.map((course) => (
                        <div
                          key={course.id}
                          onClick={() => setSelectedCourse(course)}
                          className={`p-4 rounded-lg cursor-pointer transition-colors border ${
                            selectedCourse?.id === course.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:bg-muted/30'
                          }`}
                          data-testid={`course-${course.id}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-medium">{course.title}</h3>
                              <p className="text-sm text-muted-foreground">{course.instructor}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getDifficultyColor(course.difficulty)}>
                                {course.difficulty}
                              </Badge>
                              {course.isPublished ? (
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  Published
                                </Badge>
                              ) : (
                                <Badge variant="secondary">Draft</Badge>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {course.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center">
                                <PlayCircle className="w-3 h-3 mr-1" />
                                {course.lessons} lessons
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {course.duration}min
                              </span>
                              <span className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {course.enrollments}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 mr-1 text-yellow-500" />
                              <span className="font-medium">{course.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {course.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Course Details */}
              <div className="w-1/3">
                {selectedCourse ? (
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Course Details</span>
                        <Button variant="outline" size="sm" data-testid="button-edit-course">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium">{selectedCourse.title}</h3>
                        <p className="text-sm text-muted-foreground">by {selectedCourse.instructor}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Category</label>
                          <p className="text-sm">{categories.find(c => c.value === selectedCourse.category)?.label}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Difficulty</label>
                          <Badge className={getDifficultyColor(selectedCourse.difficulty)}>
                            {selectedCourse.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Description</label>
                        <p className="text-sm">{selectedCourse.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Duration</label>
                          <p className="text-sm">{selectedCourse.duration} minutes</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Lessons</label>
                          <p className="text-sm">{selectedCourse.lessons}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Enrollments</label>
                          <p className="text-sm">{selectedCourse.enrollments.toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Rating</label>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{selectedCourse.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Price</label>
                        <p className="text-sm">${selectedCourse.price}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Tags</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedCourse.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Actions</h4>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start" data-testid="button-preview-course">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview Course
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full justify-start"
                            onClick={() => handlePublishCourse(selectedCourse.id, !selectedCourse.isPublished)}
                            data-testid="button-toggle-publish"
                          >
                            {selectedCourse.isPublished ? (
                              <>
                                <Lock className="w-4 h-4 mr-2" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <Unlock className="w-4 h-4 mr-2" />
                                Publish
                              </>
                            )}
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full justify-start"
                            onClick={() => handleDuplicateCourse(selectedCourse.id)}
                            data-testid="button-duplicate-course"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteCourse(selectedCourse.id)}
                            data-testid="button-delete-course"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-full">
                    <CardContent className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Select a course to view details</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="lessons" className="flex-1 overflow-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Course Lessons</h2>
                  <Button onClick={() => setShowCreateLesson(true)} data-testid="button-create-lesson">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Lesson
                  </Button>
                </div>

                {lessons.map((lesson) => (
                  <Card key={lesson.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            {getLessonTypeIcon(lesson.type)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span>Order: {lesson.order}</span>
                              <span>Duration: {lesson.duration}min</span>
                              <span>Type: {lesson.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.isPublished ? (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Draft</Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {lesson.resources.length > 0 && (
                        <div className="mt-3">
                          <h4 className="text-sm font-medium mb-2">Resources</h4>
                          <div className="flex flex-wrap gap-2">
                            {lesson.resources.map((resource) => (
                              <Badge key={resource.id} variant="outline" className="text-xs">
                                {getResourceIcon(resource.type)}
                                <span className="ml-1">{resource.name}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Resource Library
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Resource management coming soon...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload and manage course materials, videos, and documents
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Content Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Content analytics coming soon...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Track course performance, engagement, and completion rates
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Create Course Modal */}
          {showCreateCourse && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-[32rem] max-h-[80vh] overflow-auto">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Create New Course</span>
                    <Button variant="ghost" size="sm" onClick={() => setShowCreateCourse(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Course Title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="Course Description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    rows={3}
                  />
                  <Input
                    placeholder="Instructor Name"
                    value={newCourse.instructor}
                    onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                  />
                  <Select value={newCourse.category} onValueChange={(value) => setNewCourse({...newCourse, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={newCourse.difficulty} onValueChange={(value) => setNewCourse({...newCourse, difficulty: value as any})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Price (USD)"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: parseInt(e.target.value) || 0})}
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowCreateCourse(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleCreateCourse} className="flex-1" data-testid="button-confirm-create-course">
                      <Save className="w-4 h-4 mr-2" />
                      Create Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}