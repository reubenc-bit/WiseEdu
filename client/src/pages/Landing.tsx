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
  const { getCurriculumText, market, getMarketLabel } = useMarket();

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

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Learning Path!</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're just starting out or ready for advanced challenges, we have the perfect learning journey for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Young Coders */}
            <Card className="feature-card text-center p-8" data-testid="course-young-coders">
              <CardContent className="p-0">
                <div className="text-6xl mb-4">🧒</div>
                <h3 className="text-2xl font-bold mb-2">Young Coders</h3>
                <p className="text-lg text-muted-foreground mb-4">Ages 6-11</p>
                <p className="text-lg mb-6">Start your coding adventure with colorful blocks and friendly characters!</p>
                
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span>Visual block-based programming</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span>Fun games and animations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span>Simple robotics with micro:bit</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span>Progress badges and rewards</span>
                  </div>
                </div>

                <Button className="w-full" data-testid="button-start-young-coders">
                  Start Young Coder Journey
                </Button>
              </CardContent>
            </Card>

            {/* Teen Coders */}
            <Card className="feature-card text-center p-8" data-testid="course-teen-coders">
              <CardContent className="p-0">
                <div className="text-6xl mb-4">👨‍💻</div>
                <h3 className="text-2xl font-bold mb-2">Teen Coders</h3>
                <p className="text-lg text-muted-foreground mb-4">Ages 12-17</p>
                <p className="text-lg mb-6">Master real programming languages and build professional projects!</p>
                
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span>Python, JavaScript & HTML/CSS</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span>Web development projects</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span>Advanced robotics & IoT</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span>AI & machine learning basics</span>
                  </div>
                </div>

                <Button className="w-full" data-testid="button-start-teen-coders">
                  Start Teen Coder Journey
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Course Videos */}
          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">Course Preview Videos</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <VideoPlayer
                title="Young Coders in Action"
                description="Watch kids create their first animations and games"
                duration="1 min demo"
                data-testid="video-young-coders"
              />
              
              <VideoPlayer
                title="Teen Programming Projects"
                description="See teenagers building real websites and apps"
                duration="1 min showcase"
                data-testid="video-teen-projects"
              />
              
              <VideoPlayer
                title="Robotics & AI Learning"
                description="Discover our hands-on robotics curriculum"
                duration="45 sec overview"
                data-testid="video-robotics-ai"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20">
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
                <Button variant="outline" size="sm">Download Guides</Button>
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
                <Button variant="outline" size="sm">Watch Videos</Button>
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
                <Button variant="outline" size="sm">Get Tools</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Teacher Training Section */}
      <section id="teacher-training" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Teacher Training & Certification</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional development programs for educators at all levels
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
                <Button size="lg" className="mr-4" data-testid="button-teacher-training">
                  Join Training Program
                </Button>
                <Button variant="outline" size="lg" data-testid="button-schedule-demo">
                  Schedule Demo
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

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Expanding Access to Coding and Robotics Education
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                CodewiseHub is dedicated to ensuring every student has the opportunity to learn coding and robotics 
                and artificial intelligence. We create engaging, age-appropriate curriculum and provide comprehensive 
                teacher training to bring quality coding and robotics education to schools across Africa.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-accent mr-3" />
                  <span>Standards-aligned curriculum for all grade levels</span>
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
                src="@assets/generated_images/coding_and_robotics_education_5018cb03.png" 
                alt="Students learning coding and robotics in an interactive classroom" 
                className="rounded-xl shadow-2xl w-full h-auto"
                data-testid="img-classroom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Flexible pricing options for individuals, schools, and institutions
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Country-Specific Pricing */}
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{getMarketLabel(market)}</h3>
                <p className="text-muted-foreground">
                  {market === 'zimbabwe' ? 'Prices in US Dollars (USD)' : 'Prices in South African Rand (ZAR)'}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="feature-card">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold mb-2">Individual Student</h4>
                      <div className="text-3xl font-bold text-primary mb-2">
                        {market === 'zimbabwe' ? '$12' : 'R199'}
                        <span className="text-lg font-normal text-muted-foreground">/month</span>
                      </div>
                      <p className="text-muted-foreground">Perfect for individual learners</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">Access to all courses</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">Progress tracking</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">Certificate of completion</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">Email support</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6" data-testid={`button-${market}-individual`}>Choose Plan</Button>
                  </CardContent>
                </Card>

                <Card className="feature-card border-primary">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-2">Most Popular</div>
                      <h4 className="text-xl font-bold mb-2">School Package</h4>
                      <div className="text-3xl font-bold text-primary mb-2">
                        {market === 'zimbabwe' ? '$179' : 'R2,999'}
                        <span className="text-lg font-normal text-muted-foreground">/month</span>
                      </div>
                      <p className="text-muted-foreground">Up to 100 students</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">Everything in Individual</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">Teacher training included</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">Curriculum integration support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">Analytics dashboard</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">Priority support</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6" data-testid={`button-${market}-school`}>Get Started</Button>
                  </CardContent>
                </Card>

                <Card className="feature-card">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold mb-2">Enterprise</h4>
                      <div className="text-3xl font-bold text-primary mb-2">Custom</div>
                      <p className="text-muted-foreground">For large institutions</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">Unlimited students</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">Custom curriculum development</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">On-site training</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-sm">Dedicated support manager</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-6" data-testid={`button-${market}-enterprise`}>Contact Sales</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              <CheckCircle className="w-4 h-4 text-accent inline mr-2" />
              Free curriculum consultation
              <span className="mx-4">•</span>
              <CheckCircle className="w-4 h-4 text-accent inline mr-2" />
              30-day money-back guarantee
              <span className="mx-4">•</span>
              <CheckCircle className="w-4 h-4 text-accent inline mr-2" />
              Ongoing implementation support
            </p>
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
              onClick={() => window.location.href = '/contact'}
              data-testid="button-request-demo"
            >
              Schools: Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Matching Reference Implementation */}
      <footer id="contact" className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-6">Free curriculum consultation</p>
            <p className="text-muted-foreground mb-6">30-day money-back guarantee</p>
            <p className="text-muted-foreground mb-6">Ongoing implementation support</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Email Us */}
            <div className="text-center">
              <h4 className="font-semibold mb-3">Email Us</h4>
              <p className="text-xl font-bold text-primary mb-2" data-testid="text-contact-email">
                schools@codewisehub.co.za
              </p>
              <p className="text-muted-foreground">Response within 24 hours</p>
            </div>
            
            {/* Schedule Demo */}
            <div className="text-center">
              <h4 className="font-semibold mb-3">Schedule Demo</h4>
              <p className="text-muted-foreground mb-4">Book a personalized consultation</p>
              <Button 
                onClick={() => window.location.href = '/contact'}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                data-testid="footer-book-demo"
              >
                Book Now
              </Button>
            </div>
            
            {/* Visit Us */}
            <div className="text-center">
              <h4 className="font-semibold mb-3">Visit Us</h4>
              <p className="text-muted-foreground mb-2">Cape Town & Johannesburg</p>
              <p className="text-sm text-muted-foreground">Training centers available</p>
            </div>
          </div>
          
          {/* Bottom section with certifications */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  CodewiseHub
                </h3>
              </div>
              <div className="flex items-center space-x-6">
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
