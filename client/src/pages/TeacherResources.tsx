import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Presentation, 
  Award, 
  BookOpen, 
  Play, 
  Trophy,
  CheckCircle,
  Download,
  Video,
  FileText
} from "lucide-react";

export default function TeacherResources() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Teacher Training & Resources
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
              Professional development, resources, and certification programs for educators at all levels
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold"
                data-testid="button-join-training"
              >
                Join Training Program
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-secondary/10 hover:bg-secondary/20 text-primary-foreground border-primary-foreground/20 px-8 py-4 text-lg font-semibold"
                data-testid="button-schedule-demo"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Training & Certification Section */}
      <section id="teacher-training" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Teacher Training & Certification</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Become a certified coding and robotics educator with our comprehensive training program
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Transform Your Teaching</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Professional Certification</h4>
                    <p className="text-muted-foreground">
                      Become a certified coding and robotics educator with our comprehensive training program.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Presentation className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Curriculum Integration</h4>
                    <p className="text-muted-foreground">
                      Learn how to seamlessly integrate coding and robotics into your existing curriculum.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Award className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Ongoing Support</h4>
                    <p className="text-muted-foreground">
                      Access to our community of educators and continuous professional development resources.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button size="lg" className="mr-4" data-testid="button-start-certification">
                  Start Certification
                </Button>
                <Button variant="outline" size="lg" className="mr-4" data-testid="button-learn-more">
                  Learn More
                </Button>
                <Button 
                  size="lg" 
                  className="bg-secondary hover:bg-secondary/90"
                  onClick={() => window.location.href = '/professional-development'}
                  data-testid="button-professional-development"
                >
                  Professional Development Programs
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-card rounded-xl p-8 shadow-lg">
                <h4 className="text-lg font-semibold mb-4">Training Stats</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary">1,500+</div>
                    <div className="text-sm text-muted-foreground">Teachers Trained</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary">300+</div>
                    <div className="text-sm text-muted-foreground">Partner Schools</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">95%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Resources Section */}
      <section id="learning-resources" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Learning Resources</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to succeed in coding and robotics education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card" data-testid="resource-curriculum">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Curriculum Guides</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive lesson plans and activities aligned with educational standards.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>All grade levels</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Standards aligned</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Ready-to-use activities</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" data-testid="button-download-guides">
                  <Download className="w-4 h-4 mr-2" />
                  Download Guides
                </Button>
              </CardContent>
            </Card>

            <Card className="feature-card" data-testid="resource-tutorials">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Play className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Video Tutorials</h3>
                <p className="text-muted-foreground mb-4">
                  Step-by-step video guides for teachers and students.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Getting started guides</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Advanced techniques</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Best practices</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" data-testid="button-watch-videos">
                  <Video className="w-4 h-4 mr-2" />
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card className="feature-card" data-testid="resource-assessment">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Assessment Tools</h3>
                <p className="text-muted-foreground mb-4">
                  Ready-to-use assessments and rubrics for student evaluation.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Project rubrics</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Progress tracking</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Portfolio templates</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" data-testid="button-get-tools">
                  <FileText className="w-4 h-4 mr-2" />
                  Get Tools
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Development Certifications Section */}
      <section id="professional-development" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Professional Development Certifications</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advance your career with industry-recognized certifications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card" data-testid="cert-basic">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Basic Educator</h3>
                  <p className="text-muted-foreground">Foundation certification for new educators</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-3" />
                    <span className="text-sm">Introduction to coding education</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-3" />
                    <span className="text-sm">Classroom management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-3" />
                    <span className="text-sm">Basic robotics concepts</span>
                  </div>
                </div>
                <Button className="w-full" data-testid="button-basic-cert">Get Certified</Button>
              </CardContent>
            </Card>

            <Card className="feature-card border-primary" data-testid="cert-advanced">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-2">Most Popular</div>
                  <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Advanced Educator</h3>
                  <p className="text-muted-foreground">Comprehensive certification for experienced educators</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-3" />
                    <span className="text-sm">Advanced programming concepts</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-3" />
                    <span className="text-sm">Curriculum development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-3" />
                    <span className="text-sm">IoT & AI integration</span>
                  </div>
                </div>
                <Button className="w-full" data-testid="button-advanced-cert">Get Certified</Button>
              </CardContent>
            </Card>

            <Card className="feature-card" data-testid="cert-specialist">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Specialist</h3>
                  <p className="text-muted-foreground">Expert-level certification for educational leaders</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-3" />
                    <span className="text-sm">Program leadership</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-3" />
                    <span className="text-sm">Teacher training</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-3" />
                    <span className="text-sm">Research & development</span>
                  </div>
                </div>
                <Button className="w-full" data-testid="button-specialist-cert">Get Certified</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Teaching?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of educators who are already making a difference with CodewiseHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold"
              data-testid="button-start-training-cta"
            >
              Start Training Program
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground px-8 py-4 text-lg font-semibold"
              data-testid="button-contact-us"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}