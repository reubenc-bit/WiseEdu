import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface AuthModalsProps {
  showModal: 'login' | 'signup' | null;
  onClose: () => void;
}

export function AuthModals({ showModal, onClose }: AuthModalsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Redirect to Replit Auth login
      window.location.href = '/api/login';
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Redirect to Replit Auth login (which handles both login and signup)
      window.location.href = '/api/login';
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog open={showModal === 'login'} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md" data-testid="modal-login">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Sign In to CodewiseHub
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                data-testid="button-close-login"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input 
                id="login-email"
                type="email" 
                placeholder="student@school.edu"
                required
                data-testid="input-login-email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input 
                id="login-password"
                type="password" 
                placeholder="••••••••"
                required
                data-testid="input-login-password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="login-role">I am a:</Label>
              <Select defaultValue="student" data-testid="select-login-role">
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
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              data-testid="button-submit-login"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          <div className="text-center">
            <Button 
              variant="link" 
              onClick={onClose}
              data-testid="link-forgot-password"
            >
              Forgot password?
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={showModal === 'signup'} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md" data-testid="modal-signup">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Get Started with CodewiseHub
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                data-testid="button-close-signup"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input 
                id="signup-name"
                type="text" 
                placeholder="John Doe"
                required
                data-testid="input-signup-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input 
                id="signup-email"
                type="email" 
                placeholder="john@example.com"
                required
                data-testid="input-signup-email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input 
                id="signup-password"
                type="password" 
                placeholder="••••••••"
                required
                data-testid="input-signup-password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-role">I am a:</Label>
              <Select defaultValue="student" data-testid="select-signup-role">
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
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              data-testid="button-submit-signup"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Already have an account? </span>
            <Button 
              variant="link" 
              onClick={() => {
                onClose();
                // You can add logic here to switch to login modal if needed
              }}
              className="p-0 h-auto"
              data-testid="link-switch-to-login"
            >
              Sign in
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
