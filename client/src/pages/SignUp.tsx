import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, ArrowLeft, User, GraduationCap, Users, Shield, Star, Award, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { useMarket } from "@/contexts/MarketContext";

export default function SignUp() {
  const { market } = useMarket();
  
  const handleSignUp = () => {
    window.location.href = '/api/login';
  };

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Courses",
      description: "Age-appropriate coding lessons and projects"
    },
    {
      icon: Award,
      title: "Achievement System",
      description: "Track progress with badges and certificates"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Connect with teachers, students, and parents"
    },
    {
      icon: Star,
      title: "Real Projects",
      description: "Build apps, games, and robotics projects"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Join CodewiseHub</h1>
          <p className="text-muted-foreground">Create your account and start learning coding today</p>
        </div>

        <Card className="feature-card">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-2 text-3xl">
              <UserPlus className="w-8 h-8" />
              Join CodewiseHub
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Start your coding journey today with our educational platform
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Main Signup Button */}
            <div className="text-center">
              <Button 
                onClick={handleSignUp}
                size="lg"
                className="w-full py-6 text-lg bg-primary hover:bg-primary/90"
                data-testid="button-create-account"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Get Started with Replit
              </Button>
            </div>

            {/* Platform Features */}
            <div className="space-y-4">
              <h4 className="font-semibold text-center">What You'll Get</h4>
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    <feature.icon className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h5 className="font-medium text-sm">{feature.title}</h5>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Information */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-center">Perfect for Everyone</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-primary" />
                  <span>Students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-secondary" />
                  <span>Teachers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-accent" />
                  <span>Parents</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span>Administrators</span>
                </div>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/signin">
                  <Button variant="ghost" className="p-0 h-auto font-semibold text-primary hover:text-primary/80" data-testid="link-signin">
                    Sign in here
                  </Button>
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Educational Notice */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            🌍 Serving educational institutions in {market === 'zimbabwe' ? 'Zimbabwe' : 'South Africa'}
          </p>
          <p className="text-xs text-muted-foreground">
            🔒 Safe, secure, and curriculum-aligned learning environment
          </p>
        </div>
      </div>
    </div>
  );
}