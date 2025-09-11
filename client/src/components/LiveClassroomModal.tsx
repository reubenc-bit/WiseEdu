import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  Users, 
  MessageSquare,
  Hand,
  Settings,
  FileText,
  Code,
  Play,
  Pause,
  Square,
  Send,
  Volume2,
  VolumeX,
  Maximize,
  Phone,
  PhoneOff,
  Camera,
  CameraOff,
  Share2,
  Download,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface LiveClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Student {
  id: string;
  name: string;
  isOnline: boolean;
  hasVideo: boolean;
  hasAudio: boolean;
  hasHandRaised: boolean;
  isPresenting: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'message' | 'system' | 'code';
}

export function LiveClassroomModal({ isOpen, onClose }: LiveClassroomModalProps) {
  const [isClassActive, setIsClassActive] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true);
  const [chatMessage, setChatMessage] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  // Mock data
  const students: Student[] = [
    {
      id: "emily-chen",
      name: "Emily Chen",
      isOnline: true,
      hasVideo: true,
      hasAudio: true,
      hasHandRaised: false,
      isPresenting: false
    },
    {
      id: "marcus-johnson",
      name: "Marcus Johnson",
      isOnline: true,
      hasVideo: false,
      hasAudio: true,
      hasHandRaised: true,
      isPresenting: false
    },
    {
      id: "sofia-rodriguez",
      name: "Sofia Rodriguez",
      isOnline: true,
      hasVideo: true,
      hasAudio: true,
      hasHandRaised: false,
      isPresenting: false
    },
    {
      id: "alex-kim",
      name: "Alex Kim",
      isOnline: false,
      hasVideo: false,
      hasAudio: false,
      hasHandRaised: false,
      isPresenting: false
    },
    {
      id: "isabella-martinez",
      name: "Isabella Martinez",
      isOnline: true,
      hasVideo: true,
      hasAudio: false,
      hasHandRaised: false,
      isPresenting: false
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: "1",
      sender: "System",
      message: "Class session started",
      timestamp: "14:30:00",
      type: "system"
    },
    {
      id: "2",
      sender: "Emily Chen",
      message: "Can you hear me clearly?",
      timestamp: "14:30:15",
      type: "message"
    },
    {
      id: "3",
      sender: "Teacher",
      message: "Yes, audio is clear. Let's begin with today's Python lesson.",
      timestamp: "14:30:22",
      type: "message"
    },
    {
      id: "4",
      sender: "Marcus Johnson",
      message: "print('Hello, World!')",
      timestamp: "14:31:45",
      type: "code"
    },
    {
      id: "5",
      sender: "Sofia Rodriguez",
      message: "I'm having trouble with the variable assignment",
      timestamp: "14:32:10",
      type: "message"
    }
  ];

  const handleStartClass = () => {
    setIsClassActive(true);
    // In a real app, this would initialize video conferencing
    console.log("Starting live class session...");
  };

  const handleEndClass = () => {
    setIsClassActive(false);
    setIsRecording(false);
    setIsScreenSharing(false);
    console.log("Ending live class session...");
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    console.log(isRecording ? "Stopping recording..." : "Starting recording...");
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    console.log(isScreenSharing ? "Stopping screen share..." : "Starting screen share...");
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send the message to all participants
      console.log("Sending message:", chatMessage);
      setChatMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAllowPresenting = (studentId: string) => {
    console.log(`Allowing ${studentId} to present...`);
  };

  const handleMuteStudent = (studentId: string) => {
    console.log(`Muting student ${studentId}...`);
  };

  const onlineStudents = students.filter(s => s.isOnline);
  const raisedHands = students.filter(s => s.hasHandRaised);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Video className="w-5 h-5 mr-2" />
              Live Classroom
            </div>
            <div className="flex items-center gap-2">
              {isClassActive && (
                <>
                  <Badge variant={isRecording ? "destructive" : "secondary"} className="animate-pulse">
                    {isRecording ? "● REC" : "● LIVE"}
                  </Badge>
                  <Badge variant="outline">
                    {onlineStudents.length}/{students.length} online
                  </Badge>
                </>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[85vh]">
          {!isClassActive ? (
            // Pre-class setup
            <div className="flex-1 flex items-center justify-center">
              <Card className="w-96">
                <CardHeader>
                  <CardTitle className="text-center">Start Live Class</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center text-muted-foreground">
                    <p>Ready to begin your live coding session?</p>
                    <p className="text-sm mt-2">{students.length} students are enrolled in this class</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm">Camera</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVideoOn(!isVideoOn)}
                        className={isVideoOn ? "text-green-600" : "text-red-600"}
                      >
                        {isVideoOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm">Microphone</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMuted(!isMuted)}
                        className={!isMuted ? "text-green-600" : "text-red-600"}
                      >
                        {!isMuted ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleStartClass} className="w-full" data-testid="button-start-class">
                    <Video className="w-4 h-4 mr-2" />
                    Start Live Class
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Active class interface
            <Tabs defaultValue="classroom" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="classroom">Classroom</TabsTrigger>
                <TabsTrigger value="students">Students ({onlineStudents.length})</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="controls">Controls</TabsTrigger>
              </TabsList>

              <TabsContent value="classroom" className="flex-1 flex gap-4">
                {/* Main video area */}
                <div className="flex-1 flex flex-col">
                  <Card className="flex-1">
                    <CardContent className="h-full p-0">
                      <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden">
                        {/* Video placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">Main Camera View</p>
                            <p className="text-sm opacity-75">Your video feed appears here</p>
                          </div>
                        </div>
                        
                        {/* Screen sharing overlay */}
                        {isScreenSharing && (
                          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center">
                            <Monitor className="w-4 h-4 mr-1" />
                            Sharing Screen
                          </div>
                        )}

                        {/* Recording indicator */}
                        {isRecording && (
                          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full mr-2" />
                            Recording
                          </div>
                        )}

                        {/* Controls overlay */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMuted(!isMuted)}
                            className={`text-white hover:bg-white/20 ${isMuted ? 'bg-red-600' : ''}`}
                            data-testid="button-toggle-mic"
                          >
                            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsVideoOn(!isVideoOn)}
                            className={`text-white hover:bg-white/20 ${!isVideoOn ? 'bg-red-600' : ''}`}
                            data-testid="button-toggle-video"
                          >
                            {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleToggleScreenShare}
                            className={`text-white hover:bg-white/20 ${isScreenSharing ? 'bg-green-600' : ''}`}
                            data-testid="button-screen-share"
                          >
                            <Monitor className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleToggleRecording}
                            className={`text-white hover:bg-white/20 ${isRecording ? 'bg-red-600' : ''}`}
                            data-testid="button-record"
                          >
                            {isRecording ? <Square className="w-4 h-4" /> : <div className="w-4 h-4 bg-red-500 rounded-full" />}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleEndClass}
                            data-testid="button-end-class"
                          >
                            <PhoneOff className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Student video grid */}
                <div className="w-80 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Students</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {onlineStudents.slice(0, 4).map((student) => (
                        <div key={student.id} className="relative">
                          <div className="aspect-video bg-gray-800 rounded overflow-hidden">
                            <div className="h-full flex items-center justify-center text-white text-xs">
                              {student.hasVideo ? (
                                <div className="text-center">
                                  <Camera className="w-6 h-6 mx-auto mb-1 opacity-50" />
                                  <p>{student.name}</p>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-1">
                                    {student.name.charAt(0)}
                                  </div>
                                  <p>{student.name}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Student status indicators */}
                          <div className="absolute top-1 right-1 flex gap-1">
                            {student.hasHandRaised && (
                              <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Hand className="w-3 h-3 text-white" />
                              </div>
                            )}
                            {!student.hasAudio && (
                              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                <MicOff className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {onlineStudents.length > 4 && (
                        <div className="text-center text-sm text-muted-foreground">
                          +{onlineStudents.length - 4} more students
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {raisedHands.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center">
                          <Hand className="w-4 h-4 mr-2 text-yellow-500" />
                          Raised Hands ({raisedHands.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {raisedHands.map((student) => (
                          <div key={student.id} className="flex items-center justify-between">
                            <span className="text-sm">{student.name}</span>
                            <Button size="sm" variant="outline" onClick={() => handleAllowPresenting(student.id)}>
                              Allow
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="students" className="flex-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Student Management</CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-auto">
                    <div className="space-y-3">
                      {students.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${student.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {student.hasVideo ? (
                                  <Camera className="w-3 h-3 text-green-600" />
                                ) : (
                                  <CameraOff className="w-3 h-3 text-gray-400" />
                                )}
                                {student.hasAudio ? (
                                  <Mic className="w-3 h-3 text-green-600" />
                                ) : (
                                  <MicOff className="w-3 h-3 text-gray-400" />
                                )}
                                {student.hasHandRaised && (
                                  <Hand className="w-3 h-3 text-yellow-500" />
                                )}
                              </div>
                            </div>
                          </div>
                          {student.isOnline && (
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleMuteStudent(student.id)}>
                                <MicOff className="w-3 h-3" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleAllowPresenting(student.id)}>
                                <Share2 className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat" className="flex-1">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Class Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-auto space-y-3 mb-4">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`p-2 rounded-lg ${
                          msg.type === 'system' ? 'bg-blue-100 text-blue-800' :
                          msg.type === 'code' ? 'bg-gray-100 font-mono text-sm' :
                          'bg-muted/30'
                        }`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{msg.sender}</span>
                            <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                          </div>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Textarea
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message to the class..."
                        className="flex-1 min-h-0 h-10"
                        rows={1}
                      />
                      <Button onClick={handleSendMessage} data-testid="button-send-chat">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="controls" className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Session Controls</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Recording</span>
                        <Button
                          variant={isRecording ? "destructive" : "outline"}
                          onClick={handleToggleRecording}
                          data-testid="button-toggle-recording"
                        >
                          {isRecording ? <Square className="w-4 h-4 mr-2" /> : <div className="w-4 h-4 bg-red-500 rounded-full mr-2" />}
                          {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Screen Share</span>
                        <Button
                          variant={isScreenSharing ? "secondary" : "outline"}
                          onClick={handleToggleScreenShare}
                          data-testid="button-toggle-screen-share"
                        >
                          <Monitor className="w-4 h-4 mr-2" />
                          {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium">End Class</span>
                        <Button variant="destructive" onClick={handleEndClass}>
                          <PhoneOff className="w-4 h-4 mr-2" />
                          End Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Class Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Online Students:</span>
                        <span className="font-medium">{onlineStudents.length}/{students.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Raised Hands:</span>
                        <span className="font-medium">{raisedHands.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Session Duration:</span>
                        <span className="font-medium">00:15:32</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Chat Messages:</span>
                        <span className="font-medium">{chatMessages.length}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}