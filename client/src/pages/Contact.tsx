import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Calendar, 
  MapPin, 
  Clock, 
  Phone,
  Send,
  ArrowLeft,
  CheckCircle,
  Building
} from "lucide-react";
import { Link } from "wouter";
import { useMarket } from "@/contexts/MarketContext";

export default function Contact() {
  const { toast } = useToast();
  const { market } = useMarket();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    role: '',
    message: '',
    inquiryType: 'demo'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation - same pattern as enrollment form
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for contacting us. We'll respond within 24 hours.",
    });

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      school: '',
      role: '',
      message: '',
      inquiryType: 'demo'
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-6 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
              Ready to transform your school's STEM education? Get in touch with our team today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email Us */}
            <Card className="feature-card text-center" data-testid="contact-email">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Email Us</h3>
                <p className="text-2xl font-bold text-primary mb-2">schools@codewisehub.co.za</p>
                <p className="text-muted-foreground mb-4">Response within 24 hours</p>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = 'mailto:schools@codewisehub.co.za'}
                  data-testid="button-email-contact"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            {/* Schedule Demo */}
            <Card className="feature-card text-center" data-testid="contact-demo">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Schedule Demo</h3>
                <p className="text-muted-foreground mb-6">Book a personalized consultation</p>
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-book-demo"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </CardContent>
            </Card>

            {/* Visit Us */}
            <Card className="feature-card text-center" data-testid="contact-visit">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
                <p className="text-muted-foreground mb-6">Cape Town & Johannesburg</p>
                <p className="text-sm text-muted-foreground mb-6">Training centers available</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-visit-info"
                >
                  <Building className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="feature-card" id="contact-form">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-4">Get in Touch</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        data-testid="input-first-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        data-testid="input-last-name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <Label htmlFor="school">School/Institution</Label>
                    <Input
                      id="school"
                      value={formData.school}
                      onChange={(e) => handleInputChange('school', e.target.value)}
                      data-testid="input-school"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role">Your Role</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger data-testid="select-role">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="principal">Principal</SelectItem>
                        <SelectItem value="administrator">Administrator</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="inquiryType">Type of Inquiry</Label>
                    <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                      <SelectTrigger data-testid="select-inquiry-type">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="demo">Schedule Demo</SelectItem>
                        <SelectItem value="pricing">Pricing Information</SelectItem>
                        <SelectItem value="training">Teacher Training</SelectItem>
                        <SelectItem value="curriculum">Curriculum Integration</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your needs, goals, or questions..."
                      className="min-h-32"
                      data-testid="input-message"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                    data-testid="button-submit-contact"
                  >
                    {isLoading ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <Card className="feature-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Response Times
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Demo requests: Same day response</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>General inquiries: Within 24 hours</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Technical support: Within 4 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Office Locations
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Cape Town</p>
                    <p className="text-muted-foreground">Training Center & Head Office</p>
                  </div>
                  <div>
                    <p className="font-medium">Johannesburg</p>
                    <p className="text-muted-foreground">Regional Training Center</p>
                  </div>
                  {market === 'zimbabwe' && (
                    <div>
                      <p className="font-medium">Harare</p>
                      <p className="text-muted-foreground">Partner Training Center</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}