import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users,
  Activity,
  Clock,
  Target,
  DollarSign,
  Globe,
  Smartphone,
  Monitor,
  Download,
  RefreshCw,
  Calendar,
  Filter,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus,
  BookOpen,
  GraduationCap,
  Award,
  MessageSquare,
  PlayCircle,
  PauseCircle
} from "lucide-react";

interface PlatformAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AnalyticsMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

interface ChartData {
  period: string;
  value: number;
  category?: string;
}

interface TopContent {
  id: string;
  title: string;
  type: 'course' | 'lesson' | 'project';
  views: number;
  completions: number;
  rating: number;
  duration: number;
}

interface UserEngagement {
  segment: string;
  users: number;
  sessions: number;
  avgSessionTime: number;
  bounceRate: number;
  conversionRate: number;
}

export function PlatformAnalyticsModal({ isOpen, onClose }: PlatformAnalyticsModalProps) {
  const [timeRange, setTimeRange] = useState<string>("30d");
  const [selectedMetric, setSelectedMetric] = useState<string>("users");
  const [viewMode, setViewMode] = useState<string>("overview");

  // Mock analytics data
  const keyMetrics: AnalyticsMetric[] = [
    {
      label: "Total Users",
      value: "12,847",
      change: 8.2,
      trend: "up",
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      label: "Active Sessions",
      value: "3,241",
      change: 15.7,
      trend: "up", 
      icon: <Activity className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      label: "Course Completions",
      value: "1,892",
      change: -2.4,
      trend: "down",
      icon: <Target className="w-5 h-5" />,
      color: "text-orange-600"
    },
    {
      label: "Learning Hours",
      value: "45,683",
      change: 12.8,
      trend: "up",
      icon: <Clock className="w-5 h-5" />,
      color: "text-purple-600"
    },
    {
      label: "Revenue",
      value: "$89,432",
      change: 6.5,
      trend: "up",
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-emerald-600"
    },
    {
      label: "Support Tickets",
      value: "234",
      change: -18.3,
      trend: "down",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "text-red-600"
    }
  ];

  const userGrowthData: ChartData[] = [
    { period: "Week 1", value: 10245 },
    { period: "Week 2", value: 10892 },
    { period: "Week 3", value: 11456 },
    { period: "Week 4", value: 12847 }
  ];

  const topContent: TopContent[] = [
    {
      id: "python-basics",
      title: "Python Programming Fundamentals",
      type: "course",
      views: 5247,
      completions: 3891,
      rating: 4.8,
      duration: 180
    },
    {
      id: "web-dev-intro",
      title: "Introduction to Web Development",
      type: "course",
      views: 4123,
      completions: 2847,
      rating: 4.6,
      duration: 240
    },
    {
      id: "variables-lesson",
      title: "Understanding Variables in Python",
      type: "lesson",
      views: 8392,
      completions: 7241,
      rating: 4.9,
      duration: 25
    },
    {
      id: "calculator-project",
      title: "Build a Calculator App",
      type: "project",
      views: 3456,
      completions: 2891,
      rating: 4.7,
      duration: 90
    }
  ];

  const userEngagement: UserEngagement[] = [
    {
      segment: "New Users",
      users: 2847,
      sessions: 4123,
      avgSessionTime: 23.5,
      bounceRate: 28.4,
      conversionRate: 12.8
    },
    {
      segment: "Returning Users",
      users: 8932,
      sessions: 15687,
      avgSessionTime: 45.2,
      bounceRate: 15.7,
      conversionRate: 34.6
    },
    {
      segment: "Premium Users",
      users: 1068,
      sessions: 3241,
      avgSessionTime: 67.8,
      bounceRate: 8.3,
      conversionRate: 78.4
    }
  ];

  const deviceBreakdown = [
    { device: "Desktop", percentage: 58.3, users: 7496 },
    { device: "Mobile", percentage: 35.2, users: 4522 },
    { device: "Tablet", percentage: 6.5, users: 829 }
  ];

  const geographicData = [
    { country: "South Africa", users: 6423, percentage: 50.0 },
    { country: "Nigeria", users: 2569, percentage: 20.0 },
    { country: "Kenya", users: 1927, percentage: 15.0 },
    { country: "Ghana", users: 1284, percentage: 10.0 },
    { country: "Other", users: 644, percentage: 5.0 }
  ];

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-4 h-4" />;
      case 'lesson':
        return <PlayCircle className="w-4 h-4" />;
      case 'project':
        return <Target className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getContentColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'bg-blue-100 text-blue-800';
      case 'lesson':
        return 'bg-green-100 text-green-800';
      case 'project':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportData = () => {
    console.log("Exporting analytics data...");
  };

  const handleRefreshData = () => {
    console.log("Refreshing analytics data...");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Platform Analytics Dashboard
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[85vh]">
          <div className="flex items-center gap-4 mb-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" onClick={handleRefreshData} data-testid="button-refresh-data">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={handleExportData} data-testid="button-export-analytics">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="flex-1 overflow-auto">
              <div className="space-y-6">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {keyMetrics.map((metric, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                            <p className="text-2xl font-bold">{metric.value}</p>
                          </div>
                          <div className={`${metric.color}`}>
                            {metric.icon}
                          </div>
                        </div>
                        <div className="flex items-center mt-2">
                          {getTrendIcon(metric.trend, metric.change)}
                          <span className={`text-sm ml-1 ${
                            metric.trend === 'up' ? 'text-green-600' : 
                            metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {Math.abs(metric.change)}% from last period
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* User Growth Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        User Growth Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Interactive growth chart coming soon...</p>
                        <div className="mt-4 space-y-2">
                          {userGrowthData.map((data, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{data.period}</span>
                              <span className="font-medium">{data.value.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Device Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Monitor className="w-5 h-5 mr-2" />
                        Device Usage
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {deviceBreakdown.map((device, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="flex items-center">
                              {device.device === 'Desktop' && <Monitor className="w-4 h-4 mr-2" />}
                              {device.device === 'Mobile' && <Smartphone className="w-4 h-4 mr-2" />}
                              {device.device === 'Tablet' && <Monitor className="w-4 h-4 mr-2" />}
                              {device.device}
                            </span>
                            <span className="font-medium">{device.percentage}%</span>
                          </div>
                          <Progress value={device.percentage} />
                          <p className="text-xs text-muted-foreground">
                            {device.users.toLocaleString()} users
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Geographic Distribution */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="w-5 h-5 mr-2" />
                        Geographic Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          {geographicData.map((country, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{country.country}</span>
                                <span className="font-medium">{country.percentage}%</span>
                              </div>
                              <Progress value={country.percentage} />
                              <p className="text-xs text-muted-foreground">
                                {country.users.toLocaleString()} users
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="text-center py-8">
                          <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Interactive world map coming soon...</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="users" className="flex-1 overflow-auto">
              <div className="space-y-6">
                {/* User Engagement */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      User Engagement by Segment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userEngagement.map((segment, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-3">{segment.segment}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Users</p>
                              <p className="font-medium">{segment.users.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Sessions</p>
                              <p className="font-medium">{segment.sessions.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Avg Session Time</p>
                              <p className="font-medium">{segment.avgSessionTime}min</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Bounce Rate</p>
                              <p className="font-medium">{segment.bounceRate}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Conversion Rate</p>
                              <p className="font-medium">{segment.conversionRate}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* User Cohort Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>User Cohort Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Cohort analysis charts coming soon...</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Track user retention and behavior patterns over time
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="flex-1 overflow-auto">
              <div className="space-y-6">
                {/* Top Performing Content */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2" />
                      Top Performing Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topContent.map((content) => (
                        <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getContentColor(content.type)}`}>
                              {getContentIcon(content.type)}
                            </div>
                            <div>
                              <h3 className="font-medium">{content.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{content.views.toLocaleString()} views</span>
                                <span>{content.completions.toLocaleString()} completions</span>
                                <span>{content.duration}min</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getContentColor(content.type)}>
                              {content.type}
                            </Badge>
                            <div className="flex items-center mt-1">
                              <Award className="w-3 h-3 mr-1 text-yellow-500" />
                              <span className="text-sm font-medium">{content.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Content Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                          <p className="text-2xl font-bold">247</p>
                        </div>
                        <BookOpen className="w-8 h-8 text-blue-500" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        +12 new this month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Lessons</p>
                          <p className="text-2xl font-bold">1,847</p>
                        </div>
                        <PlayCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        +89 new this month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Avg Completion Rate</p>
                          <p className="text-2xl font-bold">74.2%</p>
                        </div>
                        <Target className="w-8 h-8 text-purple-500" />
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">+5.3% from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="engagement" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Engagement Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Detailed engagement analytics coming soon...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Track user interactions, session patterns, and learning behavior
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Revenue Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Revenue analytics coming soon...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Track subscription revenue, course sales, and financial metrics
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