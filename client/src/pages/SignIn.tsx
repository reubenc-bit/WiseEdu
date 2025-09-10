import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, ArrowLeft, Shield, Users, GraduationCap } from "lucide-react";
import { Link } from "wouter";

export default function SignIn() {
  const handleLogin = () => {
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
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-2 text-3xl">
              <LogIn className="w-8 h-8" />
              Welcome Back
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Access your CodewiseHub account with secure authentication
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Main Login Button */}
            <div className="text-center">
              <Button 
                onClick={handleLogin}
                size="lg"
                className="w-full py-6 text-lg bg-primary hover:bg-primary/90"
                data-testid="button-sign-in"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign In with Replit
              </Button>
            </div>

            {/* Role Information */}
            <div className="bg-muted/50 rounded-lg p-6">
              <h4 className="font-semibold mb-4 text-center">Access for All Roles</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm"><strong>Students:</strong> Access courses and coding environment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                  <span className="text-sm"><strong>Teachers:</strong> Manage classes and track progress</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm"><strong>Parents:</strong> Monitor child's learning journey</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                🔒 Secure authentication powered by Replit
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            New to CodewiseHub? Your role will be set up after first sign-in
          </p>
          <div className="mt-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" data-testid="link-learn-more">
                Learn more about our platform
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}