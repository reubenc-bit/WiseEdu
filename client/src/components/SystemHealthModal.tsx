import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Server, 
  Database, 
  Wifi, 
  HardDrive,
  Cpu,
  MemoryStick,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Download,
  Settings,
  Monitor,
  Shield,
  Zap,
  Globe,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Eye,
  Terminal,
  Cloud
} from "lucide-react";

interface SystemHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SystemMetric {
  label: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  threshold: number;
  trend: 'up' | 'down' | 'stable';
}

interface ServiceStatus {
  name: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  endpoint: string;
}

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  component: string;
  resolved: boolean;
}

interface PerformanceData {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  activeUsers: number;
}

export function SystemHealthModal({ isOpen, onClose }: SystemHealthModalProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("24h");
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  // Mock system metrics
  const systemMetrics: SystemMetric[] = [
    {
      label: "CPU Usage",
      value: 67,
      unit: "%",
      status: "warning",
      threshold: 80,
      trend: "up"
    },
    {
      label: "Memory Usage", 
      value: 45,
      unit: "%",
      status: "healthy",
      threshold: 85,
      trend: "stable"
    },
    {
      label: "Disk Usage",
      value: 32,
      unit: "%", 
      status: "healthy",
      threshold: 90,
      trend: "up"
    },
    {
      label: "Network Latency",
      value: 45,
      unit: "ms",
      status: "healthy",
      threshold: 100,
      trend: "down"
    },
    {
      label: "Database Connections",
      value: 78,
      unit: "connections",
      status: "healthy",
      threshold: 100,
      trend: "stable"
    },
    {
      label: "API Response Time",
      value: 120,
      unit: "ms",
      status: "warning",
      threshold: 200,
      trend: "up"
    }
  ];

  const services: ServiceStatus[] = [
    {
      name: "Web Application",
      status: "online",
      uptime: 99.8,
      responseTime: 89,
      lastCheck: "2024-03-15T16:30:00Z",
      endpoint: "https://codewisehub.com"
    },
    {
      name: "API Gateway",
      status: "online",
      uptime: 99.9,
      responseTime: 120,
      lastCheck: "2024-03-15T16:30:00Z",
      endpoint: "https://api.codewisehub.com"
    },
    {
      name: "Database",
      status: "online",
      uptime: 99.7,
      responseTime: 25,
      lastCheck: "2024-03-15T16:30:00Z",
      endpoint: "postgresql://prod-db"
    },
    {
      name: "File Storage",
      status: "degraded",
      uptime: 98.9,
      responseTime: 250,
      lastCheck: "2024-03-15T16:30:00Z",
      endpoint: "https://storage.codewisehub.com"
    },
    {
      name: "Authentication Service",
      status: "online",
      uptime: 99.95,
      responseTime: 67,
      lastCheck: "2024-03-15T16:30:00Z",
      endpoint: "https://auth.codewisehub.com"
    },
    {
      name: "Video Streaming",
      status: "online",
      uptime: 99.2,
      responseTime: 180,
      lastCheck: "2024-03-15T16:30:00Z",
      endpoint: "https://video.codewisehub.com"
    }
  ];

  const alerts: Alert[] = [
    {
      id: "alert-1",
      type: "warning",
      message: "High CPU usage detected on web server cluster",
      timestamp: "2024-03-15T16:25:00Z",
      component: "Web Server",
      resolved: false
    },
    {
      id: "alert-2",
      type: "error",
      message: "File storage service experiencing degraded performance",
      timestamp: "2024-03-15T15:45:00Z",
      component: "Storage",
      resolved: false
    },
    {
      id: "alert-3",
      type: "info",
      message: "Scheduled maintenance completed successfully",
      timestamp: "2024-03-15T14:00:00Z",
      component: "Database",
      resolved: true
    },
    {
      id: "alert-4",
      type: "warning",
      message: "API response time above threshold for 5 minutes",
      timestamp: "2024-03-15T13:30:00Z",
      component: "API Gateway",
      resolved: true
    }
  ];

  const performanceData: PerformanceData[] = [
    {
      timestamp: "2024-03-15T12:00:00Z",
      cpu: 45,
      memory: 38,
      disk: 30,
      network: 25,
      activeUsers: 1247
    },
    {
      timestamp: "2024-03-15T13:00:00Z", 
      cpu: 52,
      memory: 42,
      disk: 31,
      network: 35,
      activeUsers: 1456
    },
    {
      timestamp: "2024-03-15T14:00:00Z",
      cpu: 48,
      memory: 40,
      disk: 31,
      network: 28,
      activeUsers: 1623
    },
    {
      timestamp: "2024-03-15T15:00:00Z",
      cpu: 63,
      memory: 44,
      disk: 32,
      network: 42,
      activeUsers: 1891
    },
    {
      timestamp: "2024-03-15T16:00:00Z",
      cpu: 67,
      memory: 45,
      disk: 32,
      network: 45,
      activeUsers: 2134
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'warning':
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
      case 'degraded':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical':
      case 'offline':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-red-600" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-green-600" />;
      default:
        return <BarChart3 className="w-3 h-3 text-blue-600" />;
    }
  };

  const getMetricIcon = (label: string) => {
    switch (label) {
      case 'CPU Usage':
        return <Cpu className="w-5 h-5" />;
      case 'Memory Usage':
        return <MemoryStick className="w-5 h-5" />;
      case 'Disk Usage':
        return <HardDrive className="w-5 h-5" />;
      case 'Network Latency':
        return <Wifi className="w-5 h-5" />;
      case 'Database Connections':
        return <Database className="w-5 h-5" />;
      case 'API Response Time':
        return <Globe className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const handleRefreshData = () => {
    console.log("Refreshing system health data...");
  };

  const handleExportLogs = () => {
    console.log("Exporting system logs...");
  };

  const handleResolveAlert = (alertId: string) => {
    console.log("Resolving alert:", alertId);
  };

  const handleRestartService = (serviceName: string) => {
    console.log("Restarting service:", serviceName);
  };

  const overallHealthScore = systemMetrics.reduce((score, metric) => {
    if (metric.status === 'healthy') return score + 100;
    if (metric.status === 'warning') return score + 70;
    return score + 30;
  }, 0) / systemMetrics.length;

  const activeAlerts = alerts.filter(alert => !alert.resolved);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            System Health & Monitoring
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[85vh]">
          <div className="flex items-center gap-4 mb-4">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <Clock className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 ml-auto">
              <Badge variant={overallHealthScore > 80 ? "default" : overallHealthScore > 60 ? "secondary" : "destructive"}>
                Health Score: {Math.round(overallHealthScore)}%
              </Badge>
              {activeAlerts.length > 0 && (
                <Badge variant="destructive">
                  {activeAlerts.length} Active Alerts
                </Badge>
              )}
              <Button variant="outline" onClick={handleRefreshData} data-testid="button-refresh-health">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={handleExportLogs} data-testid="button-export-logs">
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="flex-1 overflow-auto">
              <div className="space-y-6">
                {/* System Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {systemMetrics.map((metric, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {getMetricIcon(metric.label)}
                            <span className="ml-2 font-medium">{metric.label}</span>
                          </div>
                          {getTrendIcon(metric.trend)}
                        </div>
                        
                        <div className="flex items-end justify-between mb-2">
                          <span className="text-2xl font-bold">
                            {metric.value}{metric.unit}
                          </span>
                          <Badge className={getStatusColor(metric.status)}>
                            {metric.status}
                          </Badge>
                        </div>
                        
                        <Progress 
                          value={(metric.value / metric.threshold) * 100} 
                          className="mb-1"
                        />
                        <p className="text-xs text-muted-foreground">
                          Threshold: {metric.threshold}{metric.unit}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Service Status Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Server className="w-5 h-5 mr-2" />
                        Critical Services
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {services.slice(0, 4).map((service) => (
                        <div key={service.name} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(service.status)}
                            <span className="font-medium text-sm">{service.name}</span>
                          </div>
                          <div className="text-right text-sm">
                            <div className="font-medium">{service.uptime}% uptime</div>
                            <div className="text-muted-foreground">{service.responseTime}ms</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recent Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Performance Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Performance charts coming soon...</p>
                        <div className="mt-4 space-y-2">
                          {performanceData.slice(-3).map((data, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{new Date(data.timestamp).toLocaleTimeString()}</span>
                              <span>CPU: {data.cpu}% | Mem: {data.memory}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Information */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Monitor className="w-5 h-5 mr-2" />
                        System Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Infrastructure</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Environment:</span>
                              <span className="font-medium">Production</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Region:</span>
                              <span className="font-medium">us-east-1</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Servers:</span>
                              <span className="font-medium">12 active</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Current Load</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Active Users:</span>
                              <span className="font-medium">2,134</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Requests/min:</span>
                              <span className="font-medium">15,247</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Data Transfer:</span>
                              <span className="font-medium">2.4 GB/h</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Security</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>SSL Status:</span>
                              <span className="font-medium text-green-600">Valid</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Firewall:</span>
                              <span className="font-medium text-green-600">Active</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Last Scan:</span>
                              <span className="font-medium">2h ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="services" className="flex-1 overflow-auto">
              <div className="space-y-4">
                {services.map((service) => (
                  <Card key={service.name}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(service.status)}
                          <div>
                            <h3 className="font-medium">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">{service.endpoint}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right text-sm">
                            <div className="font-medium">{service.uptime}% uptime</div>
                            <div className="text-muted-foreground">{service.responseTime}ms avg</div>
                          </div>
                          <Badge className={getStatusColor(service.status)}>
                            {service.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" data-testid={`view-${service.name.toLowerCase().replace(/\s+/g, '-')}`}>
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            {service.status !== 'online' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleRestartService(service.name)}
                                data-testid={`restart-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                <RefreshCw className="w-4 h-4 mr-1" />
                                Restart
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        Last checked: {new Date(service.lastCheck).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Detailed performance charts coming soon...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Real-time monitoring of CPU, memory, disk, and network metrics
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="flex-1 overflow-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">System Alerts</h2>
                  <Badge variant={activeAlerts.length > 0 ? "destructive" : "default"}>
                    {activeAlerts.length} Active
                  </Badge>
                </div>

                {alerts.map((alert) => (
                  <Card key={alert.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <h3 className="font-medium">{alert.message}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>Component: {alert.component}</span>
                              <span>{new Date(alert.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {alert.resolved ? (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Resolved
                            </Badge>
                          ) : (
                            <>
                              <Badge className={getStatusColor(alert.type)}>
                                {alert.type}
                              </Badge>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleResolveAlert(alert.id)}
                                data-testid={`resolve-${alert.id}`}
                              >
                                Resolve
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="logs" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Terminal className="w-5 h-5 mr-2" />
                    System Logs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Terminal className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Real-time log viewer coming soon...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      View and search through application and system logs
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