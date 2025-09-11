import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Star, 
  MessageSquare, 
  Download,
  Search,
  Filter,
  User,
  Calendar,
  BarChart3
} from "lucide-react";

interface GradeManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  submissions: Submission[];
}

interface Submission {
  id: string;
  studentName: string;
  submittedAt: string;
  status: 'submitted' | 'late' | 'pending';
  grade?: number;
  feedback?: string;
  files: string[];
}

export function GradeManagementModal({ isOpen, onClose }: GradeManagementModalProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<string>("python-basics");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [gradeInput, setGradeInput] = useState<string>("");
  const [feedbackInput, setFeedbackInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data
  const assignments: Assignment[] = [
    {
      id: "python-basics",
      title: "Python Variables & Functions",
      course: "Grade 6 - Python Basics",
      dueDate: "2024-03-15",
      submissions: [
        {
          id: "sub1",
          studentName: "Emily Chen",
          submittedAt: "2024-03-14T10:30:00Z",
          status: "submitted",
          grade: 95,
          feedback: "Excellent work! Clean code structure and good use of functions.",
          files: ["variables_project.py", "function_examples.py"]
        },
        {
          id: "sub2",
          studentName: "Marcus Johnson",
          submittedAt: "2024-03-15T15:45:00Z",
          status: "late",
          grade: 88,
          feedback: "Good understanding but submitted late. Work on time management.",
          files: ["assignment.py"]
        },
        {
          id: "sub3",
          studentName: "Sofia Rodriguez",
          submittedAt: "2024-03-13T09:15:00Z",
          status: "submitted",
          files: ["python_homework.py", "extra_challenges.py"]
        },
        {
          id: "sub4",
          studentName: "Alex Kim",
          submittedAt: "",
          status: "pending",
          files: []
        }
      ]
    },
    {
      id: "web-dev",
      title: "HTML & CSS Portfolio",
      course: "Grade 8 - Web Development",
      dueDate: "2024-03-20",
      submissions: [
        {
          id: "sub5",
          studentName: "Isabella Martinez",
          submittedAt: "2024-03-19T14:20:00Z",
          status: "submitted",
          grade: 92,
          files: ["index.html", "styles.css", "portfolio.zip"]
        }
      ]
    }
  ];

  const currentAssignment = assignments.find(a => a.id === selectedAssignment);
  const filteredSubmissions = currentAssignment?.submissions.filter(sub => {
    const matchesSearch = sub.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleGradeSubmission = () => {
    if (selectedSubmission && gradeInput) {
      // In a real app, this would make an API call
      console.log(`Grading submission ${selectedSubmission.id} with grade ${gradeInput} and feedback: ${feedbackInput}`);
      setGradeInput("");
      setFeedbackInput("");
      setSelectedSubmission(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="default" className="bg-green-100 text-green-800">Submitted</Badge>;
      case 'late':
        return <Badge variant="destructive">Late</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 80) return "text-blue-600";
    if (grade >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Grade Management
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[80vh]">
          <Tabs defaultValue="assignments" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="gradebook">Gradebook</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="assignments" className="flex-1 flex gap-4 overflow-hidden">
              {/* Assignment Selection */}
              <div className="w-1/3 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Assignments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        onClick={() => setSelectedAssignment(assignment.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedAssignment === assignment.id 
                            ? 'bg-primary/10 border border-primary/20' 
                            : 'bg-muted/30 hover:bg-muted/50'
                        }`}
                        data-testid={`assignment-${assignment.id}`}
                      >
                        <h3 className="font-medium">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {assignment.submissions.filter(s => s.status !== 'pending').length}/
                            {assignment.submissions.length}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Submissions */}
              <div className="flex-1 space-y-4">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{currentAssignment?.title} - Submissions</span>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 w-48"
                          />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-32">
                            <Filter className="w-4 h-4 mr-1" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="submitted">Submitted</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-auto">
                    <div className="space-y-3">
                      {filteredSubmissions.map((submission) => (
                        <div
                          key={submission.id}
                          onClick={() => setSelectedSubmission(submission)}
                          className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                            selectedSubmission?.id === submission.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:bg-muted/30'
                          }`}
                          data-testid={`submission-${submission.id}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-2 text-muted-foreground" />
                              <span className="font-medium">{submission.studentName}</span>
                            </div>
                            {getStatusBadge(submission.status)}
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {submission.submittedAt 
                                ? new Date(submission.submittedAt).toLocaleString()
                                : "Not submitted"}
                            </div>
                            {submission.grade && (
                              <div className={`flex items-center font-medium ${getGradeColor(submission.grade)}`}>
                                <Star className="w-3 h-3 mr-1" />
                                {submission.grade}/100
                              </div>
                            )}
                          </div>

                          {submission.files.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {submission.files.map((file, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  <FileText className="w-3 h-3 mr-1" />
                                  {file}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {submission.feedback && (
                            <div className="mt-2 p-2 bg-muted/30 rounded text-sm">
                              <div className="flex items-center mb-1">
                                <MessageSquare className="w-3 h-3 mr-1 text-muted-foreground" />
                                <span className="text-xs font-medium text-muted-foreground">Feedback:</span>
                              </div>
                              {submission.feedback}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Grading Panel */}
              {selectedSubmission && (
                <div className="w-1/3 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Grade Submission</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium">{selectedSubmission.studentName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedSubmission.submittedAt 
                            ? `Submitted: ${new Date(selectedSubmission.submittedAt).toLocaleString()}`
                            : "Not submitted yet"}
                        </p>
                      </div>

                      {selectedSubmission.files.length > 0 && (
                        <div>
                          <label className="text-sm font-medium">Files:</label>
                          <div className="space-y-2 mt-1">
                            {selectedSubmission.files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                                <span className="text-sm flex items-center">
                                  <FileText className="w-4 h-4 mr-2" />
                                  {file}
                                </span>
                                <Button size="sm" variant="ghost" data-testid={`download-${index}`}>
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-sm font-medium">Grade (0-100):</label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={gradeInput}
                          onChange={(e) => setGradeInput(e.target.value)}
                          placeholder={selectedSubmission.grade?.toString() || "Enter grade"}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Feedback:</label>
                        <Textarea
                          value={feedbackInput}
                          onChange={(e) => setFeedbackInput(e.target.value)}
                          placeholder={selectedSubmission.feedback || "Provide detailed feedback..."}
                          className="mt-1"
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={handleGradeSubmission}
                          disabled={!gradeInput}
                          className="flex-1"
                          data-testid="button-save-grade"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Save Grade
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedSubmission(null)}
                          data-testid="button-cancel-grade"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="gradebook" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Class Gradebook</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Gradebook view coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Grading Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Analytics view coming soon...</p>
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