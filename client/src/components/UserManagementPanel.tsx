import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Edit, 
  Search,
  Filter,
  Download,
  Upload,
  Mail,
  Lock,
  Unlock,
  MoreHorizontal,
  Shield,
  Crown,
  GraduationCap,
  Heart,
  Settings,
  Calendar,
  Activity,
  AlertTriangle,
  CheckCircle,
  Ban,
  Eye
} from "lucide-react";

interface UserManagementPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  market: string;
  createdAt: string;
  lastActive: string;
  profileComplete: boolean;
  enrolledCourses?: number;
  teachingClasses?: number;
  children?: number;
  permissions?: string[];
}

interface UserAction {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  performedBy: string;
  details: string;
}

interface RolePermission {
  role: string;
  permissions: string[];
  description: string;
}

export function UserManagementPanel({ isOpen, onClose }: UserManagementPanelProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showCreateUser, setShowCreateUser] = useState<boolean>(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "student",
    market: "south-africa"
  });

  // Mock data
  const users: User[] = [
    {
      id: "admin-1",
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@codewisehub.com",
      role: "admin",
      status: "active",
      market: "south-africa",
      createdAt: "2024-01-15T10:00:00Z",
      lastActive: "2024-03-15T14:30:00Z",
      profileComplete: true,
      permissions: ["user_management", "content_management", "analytics", "system_settings"]
    },
    {
      id: "teacher-1",
      firstName: "Michael",
      lastName: "Johnson",
      email: "m.johnson@school.edu",
      role: "teacher",
      status: "active",
      market: "south-africa",
      createdAt: "2024-02-01T09:00:00Z",
      lastActive: "2024-03-15T16:20:00Z",
      profileComplete: true,
      teachingClasses: 3,
      permissions: ["classroom_management", "grading", "analytics"]
    },
    {
      id: "parent-1",
      firstName: "Lisa",
      lastName: "Chen",
      email: "lisa.chen@email.com",
      role: "parent",
      status: "active",
      market: "south-africa",
      createdAt: "2024-02-10T11:30:00Z",
      lastActive: "2024-03-14T19:45:00Z",
      profileComplete: true,
      children: 2
    },
    {
      id: "student-1",
      firstName: "Emily",
      lastName: "Chen",
      email: "emily.chen@student.edu",
      role: "student",
      status: "active",
      market: "south-africa",
      createdAt: "2024-02-12T08:15:00Z",
      lastActive: "2024-03-15T15:30:00Z",
      profileComplete: true,
      enrolledCourses: 2
    },
    {
      id: "student-2",
      firstName: "Alex",
      lastName: "Smith",
      email: "alex.smith@student.edu",
      role: "student",
      status: "suspended",
      market: "south-africa",
      createdAt: "2024-03-01T12:00:00Z",
      lastActive: "2024-03-10T10:15:00Z",
      profileComplete: false,
      enrolledCourses: 1
    }
  ];

  const userActions: UserAction[] = [
    {
      id: "action-1",
      userId: "student-2",
      action: "Account Suspended",
      timestamp: "2024-03-10T14:30:00Z",
      performedBy: "Sarah Wilson",
      details: "Violated community guidelines - inappropriate behavior in chat"
    },
    {
      id: "action-2",
      userId: "teacher-1",
      action: "Role Updated",
      timestamp: "2024-03-08T09:15:00Z",
      performedBy: "Sarah Wilson",
      details: "Added classroom management permissions"
    },
    {
      id: "action-3",
      userId: "parent-1",
      action: "Account Created",
      timestamp: "2024-02-10T11:30:00Z",
      performedBy: "System",
      details: "Parent account created via invitation"
    }
  ];

  const rolePermissions: RolePermission[] = [
    {
      role: "admin",
      permissions: ["user_management", "content_management", "analytics", "system_settings", "billing"],
      description: "Full system access and administrative privileges"
    },
    {
      role: "teacher",
      permissions: ["classroom_management", "grading", "student_analytics", "lesson_planning"],
      description: "Teaching tools and student management capabilities"
    },
    {
      role: "parent",
      permissions: ["child_monitoring", "progress_viewing", "communication", "safety_controls"],
      description: "Access to child's learning progress and parental controls"
    },
    {
      role: "student",
      permissions: ["learning_platform", "project_submission", "peer_collaboration"],
      description: "Access to learning content and collaboration tools"
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4" />;
      case 'teacher':
        return <GraduationCap className="w-4 h-4" />;
      case 'parent':
        return <Heart className="w-4 h-4" />;
      case 'student':
        return <Users className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'teacher':
        return 'bg-blue-100 text-blue-800';
      case 'parent':
        return 'bg-green-100 text-green-800';
      case 'student':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateUser = () => {
    if (newUser.firstName && newUser.lastName && newUser.email) {
      // In a real app, this would create the user via API
      console.log("Creating user:", newUser);
      setNewUser({ firstName: "", lastName: "", email: "", role: "student", market: "south-africa" });
      setShowCreateUser(false);
    }
  };

  const handleSuspendUser = (userId: string) => {
    console.log("Suspending user:", userId);
  };

  const handleActivateUser = (userId: string) => {
    console.log("Activating user:", userId);
  };

  const handleDeleteUser = (userId: string) => {
    console.log("Deleting user:", userId);
  };

  const handleBulkAction = (action: string) => {
    console.log("Performing bulk action:", action);
  };

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    newThisMonth: users.filter(u => {
      const created = new Date(u.createdAt);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return created > monthAgo;
    }).length
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            User Management Panel
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[85vh]">
          <Tabs defaultValue="users" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              <TabsTrigger value="actions">Activity Log</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="flex-1 flex gap-4 overflow-hidden">
              {/* User List */}
              <div className="w-2/3 flex flex-col">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                          <p className="text-2xl font-bold">{userStats.total}</p>
                        </div>
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Active</p>
                          <p className="text-2xl font-bold">{userStats.active}</p>
                        </div>
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Suspended</p>
                          <p className="text-2xl font-bold">{userStats.suspended}</p>
                        </div>
                        <Ban className="w-6 h-6 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                          <p className="text-2xl font-bold">{userStats.newThisMonth}</p>
                        </div>
                        <UserPlus className="w-6 h-6 text-blue-500" />
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
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={() => setShowCreateUser(true)} data-testid="button-create-user">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* User Table */}
                <Card className="flex-1 overflow-hidden">
                  <CardContent className="p-0 h-full overflow-auto">
                    <div className="space-y-1 p-4">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          onClick={() => setSelectedUser(user)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                            selectedUser?.id === user.id
                              ? 'border-primary bg-primary/5'
                              : 'border-transparent hover:bg-muted/30'
                          }`}
                          data-testid={`user-${user.id}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                {getRoleIcon(user.role)}
                              </div>
                              <div>
                                <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getRoleColor(user.role)}>
                                {user.role}
                              </Badge>
                              <Badge className={getStatusColor(user.status)}>
                                {user.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                            <span>Last active: {new Date(user.lastActive).toLocaleDateString()}</span>
                            <span>Market: {user.market}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* User Details */}
              <div className="w-1/3">
                {selectedUser ? (
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>User Details</span>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium">{selectedUser.firstName} {selectedUser.lastName}</h3>
                        <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Role</label>
                          <Badge className={`${getRoleColor(selectedUser.role)} mt-1`}>
                            {getRoleIcon(selectedUser.role)}
                            <span className="ml-1">{selectedUser.role}</span>
                          </Badge>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Status</label>
                          <Badge className={`${getStatusColor(selectedUser.status)} mt-1`}>
                            {selectedUser.status}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Created</label>
                        <p className="text-sm">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Last Active</label>
                        <p className="text-sm">{new Date(selectedUser.lastActive).toLocaleDateString()}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Market</label>
                        <p className="text-sm">{selectedUser.market}</p>
                      </div>

                      {selectedUser.role === 'student' && selectedUser.enrolledCourses && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Enrolled Courses</label>
                          <p className="text-sm">{selectedUser.enrolledCourses}</p>
                        </div>
                      )}

                      {selectedUser.role === 'teacher' && selectedUser.teachingClasses && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Teaching Classes</label>
                          <p className="text-sm">{selectedUser.teachingClasses}</p>
                        </div>
                      )}

                      {selectedUser.role === 'parent' && selectedUser.children && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Children</label>
                          <p className="text-sm">{selectedUser.children}</p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <h4 className="font-medium">Actions</h4>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start" data-testid="button-view-profile">
                            <Eye className="w-4 h-4 mr-2" />
                            View Full Profile
                          </Button>
                          <Button variant="outline" className="w-full justify-start" data-testid="button-send-email">
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </Button>
                          {selectedUser.status === 'active' ? (
                            <Button 
                              variant="outline" 
                              className="w-full justify-start text-red-600 hover:text-red-700"
                              onClick={() => handleSuspendUser(selectedUser.id)}
                              data-testid="button-suspend-user"
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              Suspend User
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              className="w-full justify-start text-green-600 hover:text-green-700"
                              onClick={() => handleActivateUser(selectedUser.id)}
                              data-testid="button-activate-user"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Activate User
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteUser(selectedUser.id)}
                            data-testid="button-delete-user"
                          >
                            <UserMinus className="w-4 h-4 mr-2" />
                            Delete User
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-full">
                    <CardContent className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Select a user to view details</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="roles" className="flex-1 overflow-auto">
              <div className="space-y-4">
                {rolePermissions.map((rolePermission) => (
                  <Card key={rolePermission.role}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {getRoleIcon(rolePermission.role)}
                        <span className="ml-2 capitalize">{rolePermission.role}</span>
                        <Badge className={`ml-2 ${getRoleColor(rolePermission.role)}`}>
                          {users.filter(u => u.role === rolePermission.role).length} users
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{rolePermission.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {rolePermission.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="actions" className="flex-1 overflow-auto">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    User Activity Log
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userActions.map((action) => (
                    <div key={action.id} className="flex items-start justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium text-sm">{action.action}</h3>
                        <p className="text-sm text-muted-foreground">{action.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(action.timestamp).toLocaleString()} by {action.performedBy}
                        </p>
                      </div>
                      <Badge variant="outline">
                        User ID: {action.userId.split('-')[0]}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bulk" className="flex-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Bulk Operations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">User Actions</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start" onClick={() => handleBulkAction('export')}>
                          <Download className="w-4 h-4 mr-2" />
                          Export User Data
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => handleBulkAction('import')}>
                          <Upload className="w-4 h-4 mr-2" />
                          Import Users (CSV)
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => handleBulkAction('send_notifications')}>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Notifications
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">System Actions</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start" onClick={() => handleBulkAction('cleanup')}>
                          <Settings className="w-4 h-4 mr-2" />
                          Cleanup Inactive Users
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => handleBulkAction('reset_passwords')}>
                          <Lock className="w-4 h-4 mr-2" />
                          Bulk Password Reset
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => handleBulkAction('sync_roles')}>
                          <Shield className="w-4 h-4 mr-2" />
                          Sync Role Permissions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Create User Modal */}
          {showCreateUser && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-96">
                <CardHeader>
                  <CardTitle>Create New User</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="First Name"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                  />
                  <Input
                    placeholder="Last Name"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowCreateUser(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleCreateUser} className="flex-1" data-testid="button-confirm-create-user">
                      Create User
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