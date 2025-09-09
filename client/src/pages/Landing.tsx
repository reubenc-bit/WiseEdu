import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useMarket } from "@/contexts/MarketContext";
import { 
  GraduationCap, 
  Bot, 
  Presentation, 
  BarChart3, 
  Globe, 
  Shield,
  CheckCircle,
  Play,
  Trophy,
  Users,
  BookOpen,
  Award
} from "lucide-react";

export default function Landing() {
  const { getCurriculumText } = useMarket();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* AI Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent-foreground mb-8">
              <Bot className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">AI-Powered Learning Platform</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Learn. Code. <br/>
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Build the Future
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
              From visual programming to AI and robotics, discover the joy of creating with technology. 
              Perfect for students, educators, and curious minds ready to shape tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold"
                onClick={() => window.location.href = '/api/login'}
                data-testid="button-start-learning"
              >
                Start Learning - FREE
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-secondary/10 hover:bg-secondary/20 text-primary-foreground border-primary-foreground/20 px-8 py-4 text-lg font-semibold"
                onClick={() => scrollToSection('demo')}
                data-testid="button-watch-demo"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent" data-testid="stat-schools">300+</div>
                <div className="text-primary-foreground/70">Partner Schools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent" data-testid="stat-students">150K+</div>
                <div className="text-primary-foreground/70">Students Reached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent" data-testid="stat-teachers">1.5K+</div>
                <div className="text-primary-foreground/70">Teachers Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent" data-testid="stat-countries">10</div>
                <div className="text-primary-foreground/70">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">See CodewiseHub in Action</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch these brief videos to understand our platform and teaching approach
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <VideoPlayer
              title="Interactive Coding Hub"
              description="Explore our drag-and-drop interface and advanced code editor"
              duration="1 min demo"
              data-testid="video-coding-hub"
            />
            
            <VideoPlayer
              title="Age-Appropriate Learning"
              description="Discover our curriculum designed for different age groups"
              duration="45 sec overview"
              data-testid="video-learning-paths"
            />
            
            <VideoPlayer
              title="Real Results"
              description="See how students progress from blocks to professional coding"
              duration="1 min story"
              data-testid="video-student-success"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose CodewiseHub?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive learning platform designed for modern education with AI-powered assistance and curriculum alignment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card" data-testid="feature-age-appropriate">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Age-Appropriate Learning</h3>
                <p className="text-muted-foreground">
                  Curriculum designed for ages 6-17 with block coding for beginners and text coding for advanced learners.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card" data-testid="feature-ai-powered">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Assistance</h3>
                <p className="text-muted-foreground">
                  Personalized learning with AI tutors, instant help, and adaptive curriculum based on student progress.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card" data-testid="feature-teacher-development">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Presentation className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Teacher Professional Development</h3>
                <p className="text-muted-foreground">
                  Comprehensive training programs with certification and ongoing support for educators.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card" data-testid="feature-progress-analytics">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Progress Analytics</h3>
                <p className="text-muted-foreground">
                  Detailed tracking for students, teachers, and parents with achievement badges and performance reports.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card" data-testid="feature-curriculum-aligned">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Curriculum Aligned</h3>
                <p className="text-muted-foreground">
                  {getCurriculumText()}
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card" data-testid="feature-safe-environment">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Safe Learning Environment</h3>
                <p className="text-muted-foreground">
                  Child-safe platform with comprehensive support and parental controls.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Expanding Access to Computer Science Education
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                CodewiseHub is dedicated to ensuring every student has the opportunity to learn computer science 
                and artificial intelligence. We create engaging, age-appropriate curriculum and provide comprehensive 
                teacher training to bring quality CS education to schools across Africa.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-accent mr-3" />
                  <span>Standards-aligned curriculum for grades K-12</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-accent mr-3" />
                  <span>Professional learning for educators at all levels</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-accent mr-3" />
                  <span>AI and machine learning curriculum integration</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-accent mr-3" />
                  <span>Multi-role support for students, teachers, and parents</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80" 
                alt="Students using tablets and computers in a modern classroom" 
                className="rounded-xl shadow-2xl w-full h-auto"
                data-testid="img-classroom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Coding Journey?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students and hundreds of schools building the future with CodewiseHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-start-learning-cta"
            >
              Start Learning for FREE
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground px-8 py-4 text-lg font-semibold"
              onClick={() => scrollToSection('contact')}
              data-testid="button-request-demo"
            >
              Schools: Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                CodewiseHub
              </h3>
              <p className="text-muted-foreground mb-4">
                Empowering the next generation of innovators through comprehensive computer science education.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-home"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-features"
                >
                  Features
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <div className="space-y-2">
                <p className="text-muted-foreground" data-testid="text-contact-email">
                  Email: schools@codewisehub.co.za
                </p>
                <p className="text-muted-foreground">Response within 24 hours</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Certifications</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-accent mr-2" />
                  <span>Education Certified</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-accent mr-2" />
                  <span>ISO 27001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
