import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Calendar, 
  Clock,
  Target,
  Users,
  FileText,
  Video,
  Code,
  Lightbulb,
  CheckSquare,
  Save,
  Eye,
  Share
} from "lucide-react";

interface LessonPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  duration: number;
  targetAge: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[];
  materials: string[];
  activities: Activity[];
  assessment: string;
  homework: string;
  notes: string;
  createdAt: string;
  lastModified: string;
}

interface Activity {
  id: string;
  type: 'lecture' | 'hands-on' | 'discussion' | 'assessment' | 'break';
  title: string;
  description: string;
  duration: number;
  materials: string[];
}

export function LessonPlannerModal({ isOpen, onClose }: LessonPlannerModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("python-intro");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({});

  // Mock data
  const lessonPlans: LessonPlan[] = [
    {
      id: "python-intro",
      title: "Introduction to Python Programming",
      subject: "Python Basics",
      duration: 60,
      targetAge: "12-15",
      difficulty: "beginner",
      objectives: [
        "Understand what programming is and why Python is useful",
        "Learn basic Python syntax and structure",
        "Write and run first Python program",
        "Understand variables and data types"
      ],
      materials: [
        "Python IDE (IDLE or online editor)",
        "Projector for demonstrations",
        "Handout with syntax examples",
        "Practice exercise worksheets"
      ],
      activities: [
        {
          id: "act1",
          type: "lecture",
          title: "What is Programming?",
          description: "Introduction to programming concepts and Python overview",
          duration: 15,
          materials: ["Slides", "Video examples"]
        },
        {
          id: "act2",
          type: "hands-on",
          title: "First Python Program",
          description: "Students write and run 'Hello, World!' program",
          duration: 20,
          materials: ["Python IDE", "Step-by-step guide"]
        },
        {
          id: "act3",
          type: "hands-on",
          title: "Variables and Data Types",
          description: "Practice creating variables and understanding different data types",
          duration: 20,
          materials: ["Practice exercises", "Python IDE"]
        },
        {
          id: "act4",
          type: "assessment",
          title: "Quick Quiz",
          description: "Short quiz on concepts covered",
          duration: 5,
          materials: ["Quiz handout"]
        }
      ],
      assessment: "Students will complete a simple program that demonstrates understanding of variables and basic output",
      homework: "Complete the 'My First Program' worksheet and try creating 3 different variables",
      notes: "Monitor students closely during hands-on activities. Some may need extra help with syntax.",
      createdAt: "2024-03-10T09:00:00Z",
      lastModified: "2024-03-12T14:30:00Z"
    },
    {
      id: "web-html",
      title: "HTML Structure and Elements",
      subject: "Web Development",
      duration: 90,
      targetAge: "14-17",
      difficulty: "beginner",
      objectives: [
        "Understand HTML document structure",
        "Learn common HTML elements and tags",
        "Create a basic webpage",
        "Understand semantic HTML"
      ],
      materials: [
        "Code editor (VS Code)",
        "Web browser",
        "HTML reference sheet",
        "Example websites for analysis"
      ],
      activities: [
        {
          id: "act5",
          type: "lecture",
          title: "Web Development Overview",
          description: "Introduction to how websites work and the role of HTML",
          duration: 20,
          materials: ["Presentation", "Live website examples"]
        },
        {
          id: "act6",
          type: "hands-on",
          title: "Building First Webpage",
          description: "Students create their first HTML document",
          duration: 40,
          materials: ["Code editor", "Starter template"]
        },
        {
          id: "act7",
          type: "hands-on",
          title: "Adding Content and Structure",
          description: "Add headings, paragraphs, lists, and links",
          duration: 25,
          materials: ["HTML reference", "Practice content"]
        },
        {
          id: "act8",
          type: "assessment",
          title: "Peer Review",
          description: "Students share and review each other's webpages",
          duration: 5,
          materials: []
        }
      ],
      assessment: "Students create a personal introduction webpage using at least 5 different HTML elements",
      homework: "Research one new HTML element and create a page demonstrating its use",
      notes: "Emphasize proper nesting and semantic meaning of elements",
      createdAt: "2024-03-08T10:00:00Z",
      lastModified: "2024-03-11T16:45:00Z"
    }
  ];

  const currentPlan = lessonPlans.find(p => p.id === selectedPlan);

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return <BookOpen className="w-4 h-4" />;
      case 'hands-on':
        return <Code className="w-4 h-4" />;
      case 'discussion':
        return <Users className="w-4 h-4" />;
      case 'assessment':
        return <CheckSquare className="w-4 h-4" />;
      case 'break':
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'hands-on':
        return 'bg-green-100 text-green-800';
      case 'discussion':
        return 'bg-purple-100 text-purple-800';
      case 'assessment':
        return 'bg-orange-100 text-orange-800';
      case 'break':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSavePlan = () => {
    // In a real app, this would save to API
    console.log("Saving lesson plan...");
    setEditMode(false);
  };

  const handleDuplicatePlan = () => {
    // In a real app, this would create a copy
    console.log("Duplicating lesson plan...");
  };

  const handleDeletePlan = () => {
    // In a real app, this would delete the plan
    console.log("Deleting lesson plan...");
  };

  const handleAddActivity = () => {
    if (newActivity.title && newActivity.type) {
      // In a real app, this would add to the plan
      console.log("Adding new activity:", newActivity);
      setNewActivity({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Lesson Planner
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[85vh]">
          <div className="flex items-center gap-4 mb-4">
            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {lessonPlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" onClick={() => setShowCreateForm(true)} data-testid="button-new-plan">
                <Plus className="w-4 h-4 mr-2" />
                New Plan
              </Button>
              <Button variant="outline" onClick={handleDuplicatePlan} data-testid="button-duplicate-plan">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setEditMode(!editMode)}
                data-testid="button-edit-plan"
              >
                <Edit className="w-4 h-4 mr-2" />
                {editMode ? 'Cancel' : 'Edit'}
              </Button>
              {editMode && (
                <Button onClick={handleSavePlan} data-testid="button-save-plan">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="flex-1 overflow-auto">
              {currentPlan && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{currentPlan.title}</span>
                          <div className="flex items-center gap-2">
                            <Badge className={getDifficultyColor(currentPlan.difficulty)}>
                              {currentPlan.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              {currentPlan.duration} min
                            </Badge>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Subject</label>
                            {editMode ? (
                              <Input defaultValue={currentPlan.subject} className="mt-1" />
                            ) : (
                              <p className="mt-1">{currentPlan.subject}</p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Target Age</label>
                            {editMode ? (
                              <Input defaultValue={currentPlan.targetAge} className="mt-1" />
                            ) : (
                              <p className="mt-1">{currentPlan.targetAge} years</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="w-5 h-5 mr-2" />
                          Learning Objectives
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {editMode ? (
                          <div className="space-y-2">
                            {currentPlan.objectives.map((objective, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Checkbox defaultChecked />
                                <Input defaultValue={objective} className="flex-1" />
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            <Button variant="outline" size="sm">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Objective
                            </Button>
                          </div>
                        ) : (
                          <ul className="space-y-2">
                            {currentPlan.objectives.map((objective, index) => (
                              <li key={index} className="flex items-start">
                                <CheckSquare className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                                <span className="text-sm">{objective}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Lesson Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Duration:</span>
                          <span className="text-sm">{currentPlan.duration} minutes</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Activities:</span>
                          <span className="text-sm">{currentPlan.activities.length} activities</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Materials:</span>
                          <span className="text-sm">{currentPlan.materials.length} items</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Created:</span>
                          <span className="text-sm">{new Date(currentPlan.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Modified:</span>
                          <span className="text-sm">{new Date(currentPlan.lastModified).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-start" data-testid="button-preview-plan">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview Plan
                        </Button>
                        <Button variant="outline" className="w-full justify-start" data-testid="button-share-plan">
                          <Share className="w-4 h-4 mr-2" />
                          Share with Colleagues
                        </Button>
                        <Button variant="outline" className="w-full justify-start" data-testid="button-export-plan">
                          <FileText className="w-4 h-4 mr-2" />
                          Export as PDF
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-red-600 hover:text-red-700" 
                          onClick={handleDeletePlan}
                          data-testid="button-delete-plan"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Plan
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="activities" className="flex-1 overflow-auto">
              {currentPlan && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Lesson Activities</h3>
                    <Button onClick={() => setNewActivity({ type: 'lecture', duration: 15 })} data-testid="button-add-activity">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Activity
                    </Button>
                  </div>

                  {/* Add New Activity Form */}
                  {Object.keys(newActivity).length > 0 && (
                    <Card className="border-2 border-dashed border-primary/30">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium">Activity Type</label>
                            <Select value={newActivity.type} onValueChange={(value) => setNewActivity({...newActivity, type: value as any})}>
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="lecture">Lecture</SelectItem>
                                <SelectItem value="hands-on">Hands-on</SelectItem>
                                <SelectItem value="discussion">Discussion</SelectItem>
                                <SelectItem value="assessment">Assessment</SelectItem>
                                <SelectItem value="break">Break</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Title</label>
                            <Input
                              value={newActivity.title || ''}
                              onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                              placeholder="Activity title"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Duration (minutes)</label>
                            <Input
                              type="number"
                              value={newActivity.duration || ''}
                              onChange={(e) => setNewActivity({...newActivity, duration: parseInt(e.target.value)})}
                              placeholder="15"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="text-sm font-medium">Description</label>
                          <Textarea
                            value={newActivity.description || ''}
                            onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                            placeholder="Describe what students will do in this activity..."
                            className="mt-1"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" onClick={() => setNewActivity({})}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddActivity}>
                            Add Activity
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Existing Activities */}
                  <div className="space-y-3">
                    {currentPlan.activities.map((activity, index) => (
                      <Card key={activity.id} className="relative">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-medium">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={getActivityColor(activity.type)}>
                                    {getActivityIcon(activity.type)}
                                    <span className="ml-1">{activity.type}</span>
                                  </Badge>
                                  <Badge variant="outline">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {activity.duration} min
                                  </Badge>
                                </div>
                                <h4 className="font-medium">{activity.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                                {activity.materials && activity.materials.length > 0 && (
                                  <div className="mt-2">
                                    <span className="text-xs font-medium text-muted-foreground">Materials: </span>
                                    <span className="text-xs text-muted-foreground">
                                      {activity.materials.join(', ')}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            {editMode && (
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="materials" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Required Materials & Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentPlan && (
                    <div className="space-y-4">
                      {editMode ? (
                        <div className="space-y-2">
                          {currentPlan.materials.map((material, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Checkbox defaultChecked />
                              <Input defaultValue={material} className="flex-1" />
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Material
                          </Button>
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {currentPlan.materials.map((material, index) => (
                            <li key={index} className="flex items-center">
                              <CheckSquare className="w-4 h-4 mr-2 text-green-600" />
                              <span>{material}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessment" className="flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentPlan && (
                      editMode ? (
                        <Textarea
                          defaultValue={currentPlan.assessment}
                          placeholder="Describe how you will assess student learning..."
                          className="min-h-32"
                        />
                      ) : (
                        <p className="text-sm">{currentPlan.assessment}</p>
                      )
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Homework Assignment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentPlan && (
                      editMode ? (
                        <Textarea
                          defaultValue={currentPlan.homework}
                          placeholder="Describe the homework assignment..."
                          className="min-h-32"
                        />
                      ) : (
                        <p className="text-sm">{currentPlan.homework}</p>
                      )
                    )}
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Teacher Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentPlan && (
                      editMode ? (
                        <Textarea
                          defaultValue={currentPlan.notes}
                          placeholder="Add any additional notes or reminders..."
                          className="min-h-24"
                        />
                      ) : (
                        <p className="text-sm">{currentPlan.notes}</p>
                      )
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}