import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CodingEnvironment } from "@/components/CodingEnvironment";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Plus,
  Code,
  Folder,
  Clock,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  Share,
  Download,
  Bot,
  Palette,
  Zap
} from "lucide-react";

export default function CodingHub() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access the coding hub.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [user, toast]);

  // Fetch user projects
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
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

  // Create new project mutation
  const createProjectMutation = useMutation({
    mutationFn: async (projectData: { title: string; description?: string }) => {
      return await apiRequest('POST', '/api/projects', projectData);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Project Created",
        description: "Your new project has been created successfully!",
      });
      setShowNewProjectForm(false);
      setNewProjectTitle('');
      setNewProjectDescription('');
      // Auto-select the new project
      response.json().then(project => setSelectedProject(project.id));
    },
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
      } else {
        toast({
          title: "Error",
          description: "Failed to create project. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: async (projectId: string) => {
      return await apiRequest('DELETE', `/api/projects/${projectId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Project Deleted",
        description: "Project has been deleted successfully.",
      });
      setSelectedProject(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    },
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

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project title.",
        variant: "destructive",
      });
      return;
    }

    createProjectMutation.mutate({
      title: newProjectTitle.trim(),
      description: newProjectDescription.trim() || undefined,
    });
  };

  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes('robot') || title.toLowerCase().includes('micro:bit')) {
      return <Bot className="w-5 h-5 text-secondary" />;
    }
    if (title.toLowerCase().includes('game') || title.toLowerCase().includes('animation')) {
      return <Palette className="w-5 h-5 text-accent" />;
    }
    if (title.toLowerCase().includes('ai') || title.toLowerCase().includes('smart')) {
      return <Zap className="w-5 h-5 text-yellow-600" />;
    }
    return <Code className="w-5 h-5 text-primary" />;
  };

  const selectedProjectData = projects?.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-coding-hub-title">
            Coding Hub
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl">
            Create, code, and share your projects. From visual blocks to professional programming.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Project Sidebar */}
          <div className="lg:col-span-1">
            <Card data-testid="card-projects-sidebar">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">My Projects</CardTitle>
                  <Button 
                    size="sm" 
                    onClick={() => setShowNewProjectForm(true)}
                    data-testid="button-new-project"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* New Project Form */}
                {showNewProjectForm && (
                  <form onSubmit={handleCreateProject} className="mb-4 p-3 bg-muted/30 rounded-lg">
                    <div className="space-y-3">
                      <Input
                        placeholder="Project title"
                        value={newProjectTitle}
                        onChange={(e) => setNewProjectTitle(e.target.value)}
                        data-testid="input-project-title"
                      />
                      <Input
                        placeholder="Description (optional)"
                        value={newProjectDescription}
                        onChange={(e) => setNewProjectDescription(e.target.value)}
                        data-testid="input-project-description"
                      />
                      <div className="flex space-x-2">
                        <Button 
                          type="submit" 
                          size="sm" 
                          disabled={createProjectMutation.isPending}
                          data-testid="button-create-project"
                        >
                          {createProjectMutation.isPending ? 'Creating...' : 'Create'}
                        </Button>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setShowNewProjectForm(false);
                            setNewProjectTitle('');
                            setNewProjectDescription('');
                          }}
                          data-testid="button-cancel-create"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Projects List */}
                <div className="space-y-2">
                  {projectsLoading ? (
                    <div className="text-center py-4">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">Loading projects...</p>
                    </div>
                  ) : projects && projects.length > 0 ? (
                    projects.map((project) => (
                      <div
                        key={project.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                          selectedProject === project.id 
                            ? 'bg-primary/10 border-primary/20' 
                            : 'bg-muted/30 hover:bg-muted/50 border-transparent'
                        }`}
                        onClick={() => setSelectedProject(project.id)}
                        data-testid={`project-${project.id}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center min-w-0 flex-1">
                            <div className="mr-2 flex-shrink-0">
                              {getProjectIcon(project.title)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">{project.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(project.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center ml-2">
                            {project.isPublic ? (
                              <Eye className="w-3 h-3 text-muted-foreground" />
                            ) : (
                              <EyeOff className="w-3 h-3 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                        {project.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {project.description}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Folder className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No projects yet</p>
                      <p className="text-xs text-muted-foreground">Create your first project!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coding Environment */}
          <div className="lg:col-span-3">
            {selectedProject && selectedProjectData ? (
              <div>
                {/* Project Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    {getProjectIcon(selectedProjectData.title)}
                    <div className="ml-3">
                      <h2 className="text-2xl font-bold" data-testid="text-selected-project-title">
                        {selectedProjectData.title}
                      </h2>
                      <p className="text-muted-foreground">
                        Last updated {new Date(selectedProjectData.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={selectedProjectData.isPublic ? "default" : "secondary"}>
                      {selectedProjectData.isPublic ? "Public" : "Private"}
                    </Badge>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-testid="button-share-project"
                    >
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-testid="button-download-project"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteProjectMutation.mutate(selectedProject)}
                      disabled={deleteProjectMutation.isPending}
                      data-testid="button-delete-project"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Coding Environment */}
                <CodingEnvironment
                  projectId={selectedProject}
                  initialCode={selectedProjectData.code || ''}
                  language="python"
                />
              </div>
            ) : (
              <Card className="h-[600px] flex items-center justify-center" data-testid="card-no-project-selected">
                <CardContent className="text-center">
                  <Code className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Welcome to Coding Hub</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Select an existing project from the sidebar or create a new one to start coding!
                  </p>
                  <Button 
                    onClick={() => setShowNewProjectForm(true)}
                    data-testid="button-create-first-project"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Project
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Templates Section */}
        <Card className="mt-8" data-testid="card-project-templates">
          <CardHeader>
            <CardTitle>Project Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" data-testid="template-hello-world">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium mb-1">Hello World</h4>
                <p className="text-sm text-muted-foreground">Start with the basics</p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" data-testid="template-led-display">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                  <Bot className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-medium mb-1">LED Display</h4>
                <p className="text-sm text-muted-foreground">micro:bit LED patterns</p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" data-testid="template-simple-game">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                  <Palette className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-medium mb-1">Simple Game</h4>
                <p className="text-sm text-muted-foreground">Interactive game template</p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" data-testid="template-ai-chatbot">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <h4 className="font-medium mb-1">AI Chatbot</h4>
                <p className="text-sm text-muted-foreground">Basic AI conversation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
