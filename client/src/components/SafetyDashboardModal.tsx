import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Clock, 
  Eye, 
  Settings,
  AlertTriangle,
  CheckCircle,
  Users,
  Monitor,
  Lock,
  Bell,
  Filter,
  Calendar,
  Activity,
  Ban,
  Globe,
  Smartphone,
  Camera,
  Mic,
  MessageSquare,
  Download,
  Save,
  RefreshCw
} from "lucide-react";

interface SafetyDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SafetySettings {
  screenTimeLimit: number;
  weekendAccess: boolean;
  contentFiltering: 'strict' | 'moderate' | 'minimal';
  allowVideoCalls: boolean;
  allowScreenShare: boolean;
  allowFileDownloads: boolean;
  allowPrivateMessages: boolean;
  monitorActivity: boolean;
  blockedWebsites: string[];
  trustedContacts: string[];
  emergencyContacts: string[];
}

interface ActivityLog {
  id: string;
  timestamp: string;
  activity: string;
  duration: number;
  category: 'lesson' | 'project' | 'communication' | 'browsing';
  safety_score: number;
  flagged: boolean;
  details: string;
}

interface SafetyAlert {
  id: string;
  type: 'content' | 'contact' | 'time' | 'behavior';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
  action_taken?: string;
}

export function SafetyDashboardModal({ isOpen, onClose }: SafetyDashboardModalProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [settings, setSettings] = useState<SafetySettings>({
    screenTimeLimit: 45,
    weekendAccess: true,
    contentFiltering: 'moderate',
    allowVideoCalls: true,
    allowScreenShare: false,
    allowFileDownloads: true,
    allowPrivateMessages: false,
    monitorActivity: true,
    blockedWebsites: ['social-media.com', 'gaming-site.net'],
    trustedContacts: ['Mrs. Johnson', 'Mr. Thompson', 'Principal Davis'],
    emergencyContacts: ['Parent', 'School Counselor']
  });

  const [newBlockedSite, setNewBlockedSite] = useState<string>("");
  const [newTrustedContact, setNewTrustedContact] = useState<string>("");

  // Mock data
  const activityLogs: ActivityLog[] = [
    {
      id: "1",
      timestamp: "2024-03-15T14:30:00Z",
      activity: "Python Lesson: Object-Oriented Programming",
      duration: 45,
      category: "lesson",
      safety_score: 100,
      flagged: false,
      details: "Completed lesson with excellent focus"
    },
    {
      id: "2",
      timestamp: "2024-03-15T15:20:00Z",
      activity: "Code sharing with classmate",
      duration: 10,
      category: "communication",
      safety_score: 95,
      flagged: false,
      details: "Shared homework solution via approved platform"
    },
    {
      id: "3",
      timestamp: "2024-03-15T16:00:00Z",
      activity: "Attempted to access blocked website",
      duration: 1,
      category: "browsing",
      safety_score: 30,
      flagged: true,
      details: "Tried to access social media during study time"
    },
    {
      id: "4",
      timestamp: "2024-03-14T13:45:00Z",
      activity: "Calculator Project Development",
      duration: 60,
      category: "project",
      safety_score: 100,
      flagged: false,
      details: "Independent project work with creative elements"
    }
  ];

  const safetyAlerts: SafetyAlert[] = [
    {
      id: "alert1",
      type: "time",
      severity: "medium",
      message: "Daily screen time limit reached (45 minutes)",
      timestamp: "2024-03-15T16:30:00Z",
      resolved: true,
      action_taken: "Session automatically ended"
    },
    {
      id: "alert2",
      type: "content",
      severity: "low",
      message: "Attempted to access restricted website",
      timestamp: "2024-03-15T16:00:00Z",
      resolved: true,
      action_taken: "Access blocked, parent notified"
    },
    {
      id: "alert3",
      type: "behavior",
      severity: "low",
      message: "Multiple incorrect password attempts detected",
      timestamp: "2024-03-14T15:20:00Z",
      resolved: true,
      action_taken: "Account temporarily locked"
    }
  ];

  const weeklyStats = {
    totalScreenTime: 285, // minutes
    averageSessionTime: 41, // minutes
    safetyScore: 92, // percentage
    violationsCount: 2,
    alertsTriggered: 3,
    contentBlocked: 5
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleUpdateSettings = () => {
    // In a real app, this would save settings via API
    console.log("Updating safety settings:", settings);
  };

  const handleAddBlockedSite = () => {
    if (newBlockedSite.trim()) {
      setSettings({
        ...settings,
        blockedWebsites: [...settings.blockedWebsites, newBlockedSite.trim()]
      });
      setNewBlockedSite("");
    }
  };

  const handleRemoveBlockedSite = (site: string) => {
    setSettings({
      ...settings,
      blockedWebsites: settings.blockedWebsites.filter(s => s !== site)
    });
  };

  const handleAddTrustedContact = () => {
    if (newTrustedContact.trim()) {
      setSettings({
        ...settings,
        trustedContacts: [...settings.trustedContacts, newTrustedContact.trim()]
      });
      setNewTrustedContact("");
    }
  };

  const handleRemoveTrustedContact = (contact: string) => {
    setSettings({
      ...settings,
      trustedContacts: settings.trustedContacts.filter(c => c !== contact)
    });
  };

  const resolveAlert = (alertId: string) => {
    console.log("Resolving alert:", alertId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Safety Dashboard & Parental Controls
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[85vh]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="controls">Controls</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="flex-1 overflow-auto">
              <div className="space-y-6">
                {/* Safety Score Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Safety Score</p>
                          <p className={`text-2xl font-bold ${getSafetyScoreColor(weeklyStats.safetyScore)}`}>
                            {weeklyStats.safetyScore}%
                          </p>
                        </div>
                        <Shield className={`w-8 h-8 ${getSafetyScoreColor(weeklyStats.safetyScore)}`} />
                      </div>
                      <Progress value={weeklyStats.safetyScore} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">This Week</p>
                          <p className="text-2xl font-bold">{Math.floor(weeklyStats.totalScreenTime / 60)}h {weeklyStats.totalScreenTime % 60}m</p>
                        </div>
                        <Clock className="w-8 h-8 text-blue-500" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Avg session: {weeklyStats.averageSessionTime}min
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Content Blocked</p>
                          <p className="text-2xl font-bold">{weeklyStats.contentBlocked}</p>
                        </div>
                        <Ban className="w-8 h-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Alerts</p>
                          <p className="text-2xl font-bold">{weeklyStats.alertsTriggered}</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {activityLogs.slice(0, 4).map((log) => (
                          <div key={log.id} className="flex items-start justify-between p-2 rounded-lg bg-muted/30">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{log.activity}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(log.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {log.flagged && (
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              )}
                              <Badge 
                                variant={log.safety_score >= 90 ? "default" : log.safety_score >= 70 ? "secondary" : "destructive"}
                                className="text-xs"
                              >
                                {log.safety_score}%
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Safety Controls */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Settings className="w-5 h-5 mr-2" />
                        Active Controls
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Screen Time Limit</span>
                          <Badge variant="outline">{settings.screenTimeLimit} min/day</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Content Filtering</span>
                          <Badge variant="outline">{settings.contentFiltering}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Activity Monitoring</span>
                          <Badge variant={settings.monitorActivity ? "default" : "secondary"}>
                            {settings.monitorActivity ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Video Calls</span>
                          <Badge variant={settings.allowVideoCalls ? "default" : "secondary"}>
                            {settings.allowVideoCalls ? "Allowed" : "Blocked"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Private Messages</span>
                          <Badge variant={settings.allowPrivateMessages ? "default" : "secondary"}>
                            {settings.allowPrivateMessages ? "Allowed" : "Blocked"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center" data-testid="button-emergency-lock">
                          <Lock className="w-6 h-6 mb-2" />
                          <span>Emergency Lock</span>
                          <span className="text-xs text-muted-foreground">Immediately lock account</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center" data-testid="button-extend-time">
                          <Clock className="w-6 h-6 mb-2" />
                          <span>Extend Time</span>
                          <span className="text-xs text-muted-foreground">Add 15 more minutes</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center" data-testid="button-safety-report">
                          <Download className="w-6 h-6 mb-2" />
                          <span>Safety Report</span>
                          <span className="text-xs text-muted-foreground">Download weekly report</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="controls" className="flex-1 overflow-auto">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Time Controls */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Time Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Daily Screen Time Limit (minutes)</label>
                        <Select 
                          value={settings.screenTimeLimit.toString()} 
                          onValueChange={(value) => setSettings({...settings, screenTimeLimit: parseInt(value)})}
                        >
                          <SelectTrigger className="mt-1">
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

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Weekend Access</label>
                          <p className="text-xs text-muted-foreground">Allow learning on weekends</p>
                        </div>
                        <Switch
                          checked={settings.weekendAccess}
                          onCheckedChange={(checked) => setSettings({...settings, weekendAccess: checked})}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Content Controls */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Filter className="w-5 h-5 mr-2" />
                        Content Filtering
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Filtering Level</label>
                        <Select 
                          value={settings.contentFiltering} 
                          onValueChange={(value) => setSettings({...settings, contentFiltering: value as any})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="strict">Strict - Maximum protection</SelectItem>
                            <SelectItem value="moderate">Moderate - Balanced approach</SelectItem>
                            <SelectItem value="minimal">Minimal - Basic filtering</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Monitor Activity</label>
                          <p className="text-xs text-muted-foreground">Track learning activities</p>
                        </div>
                        <Switch
                          checked={settings.monitorActivity}
                          onCheckedChange={(checked) => setSettings({...settings, monitorActivity: checked})}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Communication Controls */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Communication
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Video Calls</label>
                          <p className="text-xs text-muted-foreground">Allow video sessions with teachers</p>
                        </div>
                        <Switch
                          checked={settings.allowVideoCalls}
                          onCheckedChange={(checked) => setSettings({...settings, allowVideoCalls: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Screen Sharing</label>
                          <p className="text-xs text-muted-foreground">Allow sharing screen with teachers</p>
                        </div>
                        <Switch
                          checked={settings.allowScreenShare}
                          onCheckedChange={(checked) => setSettings({...settings, allowScreenShare: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Private Messages</label>
                          <p className="text-xs text-muted-foreground">Allow direct messaging</p>
                        </div>
                        <Switch
                          checked={settings.allowPrivateMessages}
                          onCheckedChange={(checked) => setSettings({...settings, allowPrivateMessages: checked})}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Website Controls */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="w-5 h-5 mr-2" />
                        Website Access
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Blocked Websites</label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            value={newBlockedSite}
                            onChange={(e) => setNewBlockedSite(e.target.value)}
                            placeholder="Enter website to block"
                            className="flex-1"
                          />
                          <Button onClick={handleAddBlockedSite} size="sm">
                            Add
                          </Button>
                        </div>
                        <div className="mt-2 space-y-1">
                          {settings.blockedWebsites.map((site) => (
                            <div key={site} className="flex items-center justify-between p-2 bg-red-50 rounded">
                              <span className="text-sm">{site}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleRemoveBlockedSite(site)}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleUpdateSettings} data-testid="button-save-settings">
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="flex-1 overflow-auto">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Detailed Activity Log
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activityLogs.map((log) => (
                    <div key={log.id} className="flex items-start justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm">{log.activity}</h3>
                          {log.flagged && (
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {new Date(log.timestamp).toLocaleString()} • {log.duration} minutes
                        </p>
                        <p className="text-xs text-muted-foreground">{log.details}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`mb-1 ${getSafetyScoreColor(log.safety_score)}`}>
                          Safety: {log.safety_score}%
                        </Badge>
                        <p className="text-xs text-muted-foreground">{log.category}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="flex-1 overflow-auto">
              <div className="space-y-4">
                {safetyAlerts.map((alert) => (
                  <Card key={alert.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            {alert.resolved && (
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                Resolved
                              </Badge>
                            )}
                          </div>
                          <p className="font-medium text-sm">{alert.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                          {alert.action_taken && (
                            <p className="text-xs text-green-600 mt-1">
                              Action: {alert.action_taken}
                            </p>
                          )}
                        </div>
                        {!alert.resolved && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => resolveAlert(alert.id)}
                            data-testid={`resolve-${alert.id}`}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Safety Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Comprehensive safety reports coming soon...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Detailed analysis of online activity, safety trends, and recommendations
                    </p>
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