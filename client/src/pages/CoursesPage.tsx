import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VideoPlayer } from "@/components/VideoPlayer";
import { 
  CheckCircle,
  Play,
  Star,
  Clock,
  Users,
  Trophy,
  Code,
  Bot
} from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your Learning Path!
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
              Whether you're just starting out or ready for advanced challenges, we have the perfect learning journey for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold"
                data-testid="button-start-learning"
              >
                Start Learning - FREE
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-secondary/10 hover:bg-secondary/20 text-primary-foreground border-primary-foreground/20 px-8 py-4 text-lg font-semibold"
                data-testid="button-watch-preview"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Preview
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Paths Section */}
      <section id="course-paths" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Young Coders */}
            <Card className="feature-card text-center p-8" data-testid="course-young-coders">
              <CardContent className="p-0">
                <div className="text-6xl mb-6">🧒</div>
                <h3 className="text-3xl font-bold mb-4">Young Coders</h3>
                <p className="text-lg text-muted-foreground mb-4">Ages 6-11</p>
                <p className="text-lg mb-8">Start your coding adventure with colorful blocks and friendly characters!</p>
                
                <div className="space-y-4 mb-8 text-left">
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

                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <Clock className="w-4 h-4 text-primary mr-1" />
                        <span className="text-sm font-medium">3-6 months</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <Users className="w-4 h-4 text-secondary mr-1" />
                        <span className="text-sm font-medium">25,000+</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <Star className="w-4 h-4 text-accent mr-1" />
                        <span className="text-sm font-medium">4.9/5</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg" data-testid="button-start-young-coders">
                  Start Young Coder Journey
                </Button>
              </CardContent>
            </Card>

            {/* Teen Coders */}
            <Card className="feature-card text-center p-8 border-primary" data-testid="course-teen-coders">
              <CardContent className="p-0">
                <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">Most Popular</div>
                <div className="text-6xl mb-6">👨‍💻</div>
                <h3 className="text-3xl font-bold mb-4">Teen Coders</h3>
                <p className="text-lg text-muted-foreground mb-4">Ages 12-17</p>
                <p className="text-lg mb-8">Master real programming languages and build professional projects!</p>
                
                <div className="space-y-4 mb-8 text-left">
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

                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <Clock className="w-4 h-4 text-primary mr-1" />
                        <span className="text-sm font-medium">6-12 months</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <Users className="w-4 h-4 text-secondary mr-1" />
                        <span className="text-sm font-medium">45,000+</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <Star className="w-4 h-4 text-accent mr-1" />
                        <span className="text-sm font-medium">4.8/5</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg" data-testid="button-start-teen-coders">
                  Start Teen Coder Journey
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Preview Videos */}
      <section id="course-videos" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Course Preview Videos</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See our courses in action and discover what makes CodewiseHub special
            </p>
          </div>

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
      </section>

      {/* Curriculum Details */}
      <section id="curriculum-details" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What You'll Learn</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive curriculum designed to take students from beginners to confident coders
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Young Coders Curriculum */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Young Coders Curriculum</h3>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h4 className="font-semibold mb-2">Module 1: Visual Programming Basics</h4>
                  <p className="text-muted-foreground text-sm mb-2">Learn programming concepts through drag-and-drop blocks</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>4 weeks</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-secondary pl-6">
                  <h4 className="font-semibold mb-2">Module 2: Animation & Games</h4>
                  <p className="text-muted-foreground text-sm mb-2">Create interactive stories and simple games</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>6 weeks</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-accent pl-6">
                  <h4 className="font-semibold mb-2">Module 3: Introduction to Robotics</h4>
                  <p className="text-muted-foreground text-sm mb-2">Control LEDs and sensors with micro:bit</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>6 weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teen Coders Curriculum */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                  <Bot className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold">Teen Coders Curriculum</h3>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h4 className="font-semibold mb-2">Module 1: Python Programming</h4>
                  <p className="text-muted-foreground text-sm mb-2">Master Python fundamentals and data structures</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>8 weeks</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-secondary pl-6">
                  <h4 className="font-semibold mb-2">Module 2: Web Development</h4>
                  <p className="text-muted-foreground text-sm mb-2">Build websites with HTML, CSS, and JavaScript</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>10 weeks</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-accent pl-6">
                  <h4 className="font-semibold mb-2">Module 3: Advanced Robotics & AI</h4>
                  <p className="text-muted-foreground text-sm mb-2">IoT projects and machine learning basics</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>12 weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section id="success-stories" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Student Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from students who have transformed their futures through coding
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah, Age 9</h4>
                    <p className="text-sm text-muted-foreground">Young Coder Graduate</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  "I made my first game and showed it to my whole family! Now I want to make apps that help people."
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                    <Trophy className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael, Age 15</h4>
                    <p className="text-sm text-muted-foreground">Teen Coder Graduate</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  "I built my school's website and got a part-time job as a web developer. This course changed my life!"
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                    <Trophy className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Aisha, Age 16</h4>
                    <p className="text-sm text-muted-foreground">AI Specialist</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  "Learning AI here inspired me to pursue computer science at university. I'm now developing healthcare apps."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Coding Journey?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students already building the future with CodewiseHub
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
              data-testid="button-get-demo"
            >
              Get Demo Access
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}