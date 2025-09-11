import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Send, 
  Calendar, 
  Video, 
  FileText,
  Users,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Bell,
  Search,
  Filter,
  Mail,
  Phone,
  Download,
  Paperclip,
  Eye,
  MoreHorizontal
} from "lucide-react";

interface CommunicationHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  type: 'message' | 'announcement' | 'report' | 'meeting';
  attachments?: string[];
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  category: 'general' | 'homework' | 'event' | 'achievement' | 'policy';
  priority: 'low' | 'normal' | 'high';
  isImportant: boolean;
}

interface Meeting {
  id: string;
  title: string;
  description: string;
  teacher: string;
  date: string;
  duration: number;
  type: 'parent-teacher' | 'progress-review' | 'group-meeting';
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
}

export function CommunicationHubModal({ isOpen, onClose }: CommunicationHubModalProps) {
  const [activeTab, setActiveTab] = useState<string>("messages");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState({ recipient: "", subject: "", content: "" });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  // Mock data
  const messages: Message[] = [
    {
      id: "msg1",
      sender: "Mrs. Johnson",
      recipient: "Parent",
      subject: "Emily's Excellent Progress in Python",
      content: "I wanted to share some wonderful news about Emily's progress in our Python programming class. She has shown remarkable improvement in understanding object-oriented programming concepts and has been helping other students with debugging. Her latest project, a calculator app, demonstrated excellent code organization and creativity. Keep encouraging her interest in programming!",
      timestamp: "2024-03-15T10:30:00Z",
      isRead: false,
      priority: "normal",
      type: "message",
      attachments: ["emily_project_report.pdf"]
    },
    {
      id: "msg2",
      sender: "Principal Davis",
      recipient: "All Parents",
      subject: "Upcoming STEM Fair - Student Showcase",
      content: "Dear parents, we're excited to announce our annual STEM Fair on March 25th. Students will showcase their coding projects and robotics creations. Emily has been selected to present her AI chatbot project! Please join us from 2-5 PM in the school auditorium.",
      timestamp: "2024-03-14T14:20:00Z",
      isRead: true,
      priority: "high",
      type: "announcement"
    },
    {
      id: "msg3",
      sender: "Mr. Thompson",
      recipient: "Parent",
      subject: "Weekly Progress Report",
      content: "Emily completed 4 lessons this week with an average score of 94%. She's showing strong problem-solving skills and creativity in her projects. Recommended next steps: Continue with advanced Python topics and consider enrolling in the web development track.",
      timestamp: "2024-03-13T16:45:00Z",
      isRead: true,
      priority: "normal",
      type: "report",
      attachments: ["weekly_progress_march_13.pdf"]
    }
  ];

  const announcements: Announcement[] = [
    {
      id: "ann1",
      title: "Spring Break Coding Camp Registration Open",
      content: "Register now for our exciting Spring Break Coding Camp! Students will learn game development, AI basics, and web design. Early bird discount available until March 20th.",
      author: "School Administration",
      timestamp: "2024-03-12T09:00:00Z",
      category: "event",
      priority: "normal",
      isImportant: true
    },
    {
      id: "ann2", 
      title: "New Safety Protocol for Online Classes",
      content: "We've updated our online safety guidelines. Please review the attached document with your child and ensure they understand the new protocols for live video sessions.",
      author: "Safety Coordinator",
      timestamp: "2024-03-10T11:30:00Z",
      category: "policy",
      priority: "high",
      isImportant: true
    }
  ];

  const meetings: Meeting[] = [
    {
      id: "meet1",
      title: "Parent-Teacher Conference",
      description: "Discuss Emily's progress and plan for advanced programming track",
      teacher: "Mrs. Johnson",
      date: "2024-03-20T15:00:00Z",
      duration: 30,
      type: "parent-teacher",
      status: "scheduled",
      meetingLink: "https://meet.school.edu/emily-progress"
    },
    {
      id: "meet2",
      title: "Quarterly Progress Review",
      description: "Comprehensive review of Emily's learning journey and achievements",
      teacher: "Academic Advisor",
      date: "2024-03-22T10:00:00Z",
      duration: 45,
      type: "progress-review",
      status: "scheduled"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'homework':
        return 'bg-blue-100 text-blue-800';
      case 'event':
        return 'bg-green-100 text-green-800';
      case 'achievement':
        return 'bg-yellow-100 text-yellow-800';
      case 'policy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "all" || msg.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const handleSendMessage = () => {
    if (newMessage.recipient && newMessage.subject && newMessage.content) {
      // In a real app, this would send the message via API
      console.log("Sending message:", newMessage);
      setNewMessage({ recipient: "", subject: "", content: "" });
    }
  };

  const handleScheduleMeeting = (meetingId: string) => {
    console.log("Scheduling meeting:", meetingId);
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Communication Hub
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[85vh]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="messages" className="relative">
                Messages
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
              <TabsTrigger value="compose">Compose</TabsTrigger>
            </TabsList>

            <TabsContent value="messages" className="flex-1 flex gap-4 overflow-hidden">
              {/* Messages List */}
              <div className="w-1/2 flex flex-col">
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search messages..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <Select value={filterPriority} onValueChange={setFilterPriority}>
                        <SelectTrigger className="w-32">
                          <Filter className="w-4 h-4 mr-1" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priority</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-1 overflow-hidden">
                  <CardContent className="p-0 h-full overflow-auto">
                    <div className="space-y-1 p-4">
                      {filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          onClick={() => setSelectedMessage(message)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                            selectedMessage?.id === message.id
                              ? 'border-primary bg-primary/5'
                              : 'border-transparent hover:bg-muted/30'
                          } ${!message.isRead ? 'bg-blue-50' : ''}`}
                          data-testid={`message-${message.id}`}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${!message.isRead ? 'text-primary' : ''}`}>
                                {message.sender}
                              </span>
                              {!message.isRead && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <Badge className={getPriorityColor(message.priority)}>
                              {message.priority}
                            </Badge>
                          </div>
                          <h3 className={`font-medium text-sm mb-1 ${!message.isRead ? 'text-primary' : ''}`}>
                            {message.subject}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {message.content}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.timestamp).toLocaleDateString()}
                            </span>
                            {message.attachments && (
                              <Paperclip className="w-3 h-3 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Message Detail */}
              <div className="w-1/2">
                {selectedMessage ? (
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            From: {selectedMessage.sender}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(selectedMessage.priority)}>
                            {selectedMessage.priority}
                          </Badge>
                          <Button variant="outline" size="sm" data-testid="button-reply">
                            <Mail className="w-4 h-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        {new Date(selectedMessage.timestamp).toLocaleString()}
                      </div>
                      
                      <div className="prose prose-sm max-w-none">
                        <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                      </div>

                      {selectedMessage.attachments && (
                        <div>
                          <h4 className="font-medium text-sm mb-2">Attachments</h4>
                          <div className="space-y-2">
                            {selectedMessage.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                                <div className="flex items-center">
                                  <FileText className="w-4 h-4 mr-2" />
                                  <span className="text-sm">{attachment}</span>
                                </div>
                                <Button variant="ghost" size="sm" data-testid={`download-${index}`}>
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-full">
                    <CardContent className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Select a message to read</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="announcements" className="flex-1 overflow-auto">
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{announcement.title}</h3>
                          {announcement.isImportant && (
                            <Star className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(announcement.category)}>
                            {announcement.category}
                          </Badge>
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>By {announcement.author}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(announcement.timestamp).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="meetings" className="flex-1 overflow-auto">
              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <Card key={meeting.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{meeting.title}</h3>
                          <p className="text-sm text-muted-foreground">With {meeting.teacher}</p>
                        </div>
                        <Badge className={getStatusColor(meeting.status)}>
                          {meeting.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm mb-3">{meeting.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(meeting.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {meeting.duration} minutes
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {meeting.meetingLink && (
                            <Button variant="outline" size="sm" data-testid={`join-${meeting.id}`}>
                              <Video className="w-4 h-4 mr-2" />
                              Join Meeting
                            </Button>
                          )}
                          {meeting.status === 'scheduled' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleScheduleMeeting(meeting.id)}
                              data-testid={`reschedule-${meeting.id}`}
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Reschedule
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compose" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Compose Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">To:</label>
                    <Select value={newMessage.recipient} onValueChange={(value) => setNewMessage({...newMessage, recipient: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mrs-johnson">Mrs. Johnson (Python Teacher)</SelectItem>
                        <SelectItem value="mr-thompson">Mr. Thompson (Math Teacher)</SelectItem>
                        <SelectItem value="principal">Principal Davis</SelectItem>
                        <SelectItem value="counselor">Academic Counselor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Subject:</label>
                    <Input
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                      placeholder="Enter message subject"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Message:</label>
                    <Textarea
                      value={newMessage.content}
                      onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                      placeholder="Type your message here..."
                      className="mt-1 min-h-32"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" data-testid="button-attach-file">
                      <Paperclip className="w-4 h-4 mr-2" />
                      Attach File
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setNewMessage({ recipient: "", subject: "", content: "" })}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.recipient || !newMessage.subject || !newMessage.content}
                        data-testid="button-send-message"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
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