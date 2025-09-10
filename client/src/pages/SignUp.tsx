import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, ArrowLeft, User, GraduationCap, Users, Shield, Star, Award, BookOpen, Eye, EyeOff } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useMarket } from "@/contexts/MarketContext";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const { market } = useMarket();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    market: market
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    console.log("Form submission started", { formData, selectedRole, market });

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      console.log("Validation failed: missing fields");
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      console.log("Validation failed: password mismatch");
      toast({
        title: "Password Mismatch",
        description: "Password and confirm password do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!selectedRole && !formData.role) {
      console.log("Validation failed: no role selected");
      toast({
        title: "Role Required",
        description: "Please select your role.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const requestData = {
        ...formData,
        role: selectedRole || formData.role,
        market: market
      };
      
      console.log("Sending signup request:", requestData);
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      console.log("Response received:", response.status, response.statusText);
      
      if (response.ok) {
        const result = await response.json();
        console.log("Success response:", result);
        toast({
          title: "Account Created Successfully!",
          description: "Welcome to CodewiseHub! You can now sign in to your account.",
        });
        
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'student',
          market: market
        });
        setSelectedRole('');
        setTimeout(() => {
          setLocation('/signin');
        }, 1000);
      } else {
        console.log("Error response status:", response.status);
        const responseText = await response.text();
        console.log("Error response text:", responseText);
        
        let errorMessage = "Failed to create account. Please try again.";
        
        try {
          const error = JSON.parse(responseText);
          errorMessage = error.message || errorMessage;
        } catch (parseError) {
          console.log("Response is not JSON:", parseError);
          errorMessage = `Server error (${response.status}): ${responseText.substring(0, 100)}`;
        }
        
        toast({
          title: "Sign Up Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Connection Error",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSignup = () => {
    if (typeof window !== 'undefined' && window.location.hostname.includes('replit')) {
      window.location.href = '/api/login';
    } else {
      toast({
        title: "Quick Signup",
        description: "Please fill out the form below to create your account.",
      });
    }
  };

  const roleOptions = [
    {
      value: "student",
      label: "Student",
      icon: User,
      description: "Access courses, coding environment, and projects"
    },
    {
      value: "teacher",
      label: "Teacher",
      icon: GraduationCap,
      description: "Manage classes, track progress, and access resources"
    },
    {
      value: "parent",
      label: "Parent",
      icon: Users,
      description: "Monitor child's progress and achievements"
    },
    {
      value: "admin",
      label: "Administrator",
      icon: Shield,
      description: "Full access to platform management"
    }
  ];

  const getAgeGroups = () => {
    if (market === 'zimbabwe') {
      return [
        { value: "3-5", label: "ECD A & B (3-5 years)" },
        { value: "6-12", label: "Grade 1-7 (6-12 years)" },
        { value: "13-16", label: "Form 1-4 (13-16 years)" },
        { value: "17-18", label: "Form 5-6 (17-18 years)" }
      ];
    } else {
      return [
        { value: "5-6", label: "Grade R (5-6 years)" },
        { value: "6-9", label: "Grade 1-3 (6-9 years)" },
        { value: "9-12", label: "Grade 4-6 (9-12 years)" },
        { value: "12-15", label: "Grade 7-9 (12-15 years)" },
        { value: "15-18", label: "Grade 10-12 (15-18 years)" }
      ];
    }
  };

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
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" />
              Create Account
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Conditional Quick Signup - Only show Replit Auth on Replit */}
            {typeof window !== 'undefined' && window.location.hostname.includes('replit') && (
              <>
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">Quick Registration</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get started instantly with Replit authentication
                  </p>
                  <Button 
                    onClick={handleQuickSignup}
                    className="w-full bg-primary hover:bg-primary/90"
                    data-testid="button-quick-signup"
                  >
                    Continue with Replit Auth
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or fill out the form</span>
                  </div>
                </div>
              </>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    data-testid="input-first-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    data-testid="input-last-name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@school.edu"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">I am a...</Label>
                <Select value={selectedRole || formData.role} onValueChange={(value) => {setSelectedRole(value); handleInputChange('role', value);}} required>
                  <SelectTrigger data-testid="select-role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          <role.icon className="w-4 h-4" />
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-xs text-muted-foreground">{role.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedRole === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="ageGroup">Grade Level</Label>
                  <Select required>
                    <SelectTrigger data-testid="select-age-group">
                      <SelectValue placeholder="Select your grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAgeGroups().map((group) => (
                        <SelectItem key={group.value} value={group.value}>
                          {group.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    className="pr-10"
                    data-testid="input-confirm-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    data-testid="button-toggle-confirm-password"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="rounded"
                  required
                  data-testid="checkbox-terms"
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                data-testid="button-create-account"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

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