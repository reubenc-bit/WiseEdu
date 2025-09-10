import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

  const handleDemoLogin = () => {
    window.location.href = '/api/login';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your CodewiseHub account</p>
        </div>

        <Card className="feature-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" />
              Sign In
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Demo Notice */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <h4 className="font-semibold text-accent mb-2">Quick Demo Access</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Try CodewiseHub instantly with our secure authentication system
              </p>
              <Button 
                onClick={handleDemoLogin}
                className="w-full bg-accent hover:bg-accent/90"
                data-testid="button-demo-login"
              >
                Continue with Replit Auth
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Traditional Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@school.edu"
                  required
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="pr-10"
                    data-testid="input-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="rounded"
                    data-testid="checkbox-remember"
                  />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Link href="/forgot-password">
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80" data-testid="link-forgot-password">
                    Forgot password?
                  </Button>
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                data-testid="button-sign-in"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup">
                  <Button variant="ghost" className="p-0 h-auto font-semibold text-primary hover:text-primary/80" data-testid="link-signup">
                    Sign up here
                  </Button>
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Role Selection Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            After signing in, you'll be able to select your role: Student, Teacher, Parent, or Admin
          </p>
        </div>
      </div>
    </div>
  );
}