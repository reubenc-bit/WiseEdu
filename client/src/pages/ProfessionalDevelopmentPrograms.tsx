import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Calendar, 
  Users, 
  BookOpen, 
  Award, 
  ChevronRight,
  Download,
  Video,
  CheckCircle,
  GraduationCap,
  Target,
  FileText,
  Presentation
} from "lucide-react";
import { useMarket } from "@/contexts/MarketContext";

export default function ProfessionalDevelopmentPrograms() {
  const { market } = useMarket();

  const getGradingSystem = () => {
    if (market === 'zimbabwe') {
      return {
        name: "Zimbabwean Education System",
        levels: [
          { grade: "ECD A & B", description: "Early Childhood Development", ages: "3-5 years" },
          { grade: "Grade 1-7", description: "Primary Education", ages: "6-12 years" },
          { grade: "Form 1-4", description: "Secondary Education (O-Level)", ages: "13-16 years" },
          { grade: "Form 5-6", description: "Advanced Level (A-Level)", ages: "17-18 years" }
        ]
      };
    } else {
      return {
        name: "South African Education System",
        levels: [
          { grade: "Grade R", description: "Reception Year", ages: "5-6 years" },
          { grade: "Grade 1-3", description: "Foundation Phase", ages: "6-9 years" },
          { grade: "Grade 4-6", description: "Intermediate Phase", ages: "9-12 years" },
          { grade: "Grade 7-9", description: "Senior Phase", ages: "12-15 years" },
          { grade: "Grade 10-12", description: "Further Education & Training", ages: "15-18 years" }
        ]
      };
    }
  };

  const gradingSystem = getGradingSystem();

  const programs = [
    {
      title: "Foundation Certificate Program",
      duration: "Full School Year (10 months)",
      commitment: "4 hours/week",
      target: "New to Coding Education",
      badge: "Beginner",
      color: "bg-blue-500",
      description: "Comprehensive introduction to coding education and classroom integration",
      modules: [
        "Educational Technology Foundations",
        "Block-based Programming Pedagogy", 
        "Classroom Management for Tech",
        "Assessment & Evaluation Methods",
        "Student Progress Tracking",
        "Parent-Teacher Communication"
      ]
    },
    {
      title: "Advanced Educator Certification",
      duration: "Full School Year (10 months)", 
      commitment: "6 hours/week",
      target: "Experienced Teachers",
      badge: "Advanced",
      color: "bg-purple-500",
      description: "Deep dive into advanced programming concepts and curriculum development",
      modules: [
        "Advanced Programming Languages",
        "Curriculum Design & Development",
        "Differentiated Instruction",
        "Project-Based Learning",
        "Peer Collaboration Facilitation",
        "Educational Research Methods"
      ]
    },
    {
      title: "Master Educator Program",
      duration: "Full School Year (10 months)",
      commitment: "8 hours/week", 
      target: "Educational Leaders",
      badge: "Expert",
      color: "bg-emerald-500",
      description: "Leadership training for coding education program development and mentoring",
      modules: [
        "Program Leadership & Management",
        "Teacher Training & Mentorship",
        "Institutional Strategy Development",
        "Community Engagement",
        "Research & Innovation",
        "Policy Development"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Development Programs
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-4xl mx-auto">
              Year-long comprehensive training programs designed to transform educators into confident coding instructors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold"
                onClick={() => window.location.href = '/signup'}
                data-testid="button-enroll-program"
              >
                Enroll in Program
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-secondary/10 hover:bg-secondary/20 text-primary-foreground border-primary-foreground/20 px-8 py-4 text-lg font-semibold"
                data-testid="button-download-curriculum"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Curriculum
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our Year-Long Programs?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Designed for the full school year to ensure deep learning and practical application
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card" data-testid="benefit-comprehensive">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Full Year Duration</h3>
                <p className="text-muted-foreground">
                  10-month programs align with the school calendar, providing continuous learning and support throughout the academic year.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card" data-testid="benefit-grade-specific">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Grade-Level Specific</h3>
                <p className="text-muted-foreground">
                  Tailored materials and strategies for each grade level in the {gradingSystem.name}.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card" data-testid="benefit-practical">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Practical Application</h3>
                <p className="text-muted-foreground">
                  Immediate classroom implementation with ongoing mentorship and feedback from experienced educators.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Grade Level Structure */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Grade-Level Learning Structure</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Curriculum aligned with {gradingSystem.name} requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradingSystem.levels.map((level, index) => (
              <Card key={index} className="feature-card" data-testid={`grade-level-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{level.grade}</h3>
                    <Badge variant="secondary">{level.ages}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{level.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      <span>Age-appropriate coding concepts</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      <span>Curriculum integration strategies</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      <span>Assessment rubrics & tools</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Development Path</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three comprehensive programs designed for different experience levels
            </p>
          </div>

          <div className="space-y-8">
            {programs.map((program, index) => (
              <Card key={index} className="feature-card overflow-hidden" data-testid={`program-${index}`}>
                <CardContent className="p-0">
                  <div className="md:flex">
                    <div className="md:w-1/3 p-8">
                      <div className="flex items-center mb-4">
                        <div className={`w-3 h-3 ${program.color} rounded-full mr-3`}></div>
                        <Badge variant="outline">{program.badge}</Badge>
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
                      <p className="text-muted-foreground mb-6">{program.description}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-primary mr-3" />
                          <span className="text-sm">{program.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-secondary mr-3" />
                          <span className="text-sm">{program.target}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-accent mr-3" />
                          <span className="text-sm">{program.commitment}</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        onClick={() => window.location.href = '/signup'}
                        data-testid={`button-enroll-${index}`}
                      >
                        Enroll Now <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    
                    <div className="md:w-2/3 p-8 bg-muted/20">
                      <h4 className="text-lg font-semibold mb-4">Program Modules</h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {program.modules.map((module, moduleIndex) => (
                          <div key={moduleIndex} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-accent mr-3 mt-0.5" />
                            <span className="text-sm">{module}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-border">
                        <h5 className="font-semibold mb-3">Program Resources</h5>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">
                            <Video className="w-3 h-3 mr-1" />
                            Video Tutorials
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            Lesson Plans
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <Presentation className="w-3 h-3 mr-1" />
                            Interactive Workshops
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Certification
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Learning Schedule */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">10-Month Learning Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A structured month-by-month progression through the school year
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { month: "January", focus: "Foundations & Setup", topics: ["Platform introduction", "Basic concepts", "Classroom setup"] },
              { month: "February", focus: "Block Programming", topics: ["Visual programming", "Logic building", "Student engagement"] },
              { month: "March", focus: "Assessment Methods", topics: ["Progress tracking", "Evaluation rubrics", "Feedback systems"] },
              { month: "April", focus: "Advanced Concepts", topics: ["Complex algorithms", "Problem solving", "Critical thinking"] },
              { month: "May", focus: "Project Development", topics: ["Student projects", "Collaborative work", "Presentation skills"] },
              { month: "June", focus: "Robotics Integration", topics: ["Hardware basics", "Sensor programming", "Physical computing"] },
              { month: "July", focus: "Web Technologies", topics: ["HTML/CSS basics", "Interactive websites", "Digital citizenship"] },
              { month: "August", focus: "AI & Future Tech", topics: ["AI introduction", "Machine learning basics", "Ethics in tech"] },
              { month: "September", focus: "Curriculum Integration", topics: ["Cross-subject projects", "STEAM integration", "Real-world applications"] },
              { month: "October", focus: "Professional Growth", topics: ["Teaching reflection", "Community building", "Certification preparation"] }
            ].map((schedule, index) => (
              <Card key={index} className="feature-card" data-testid={`schedule-${index}`}>
                <CardContent className="p-4">
                  <div className="text-center mb-3">
                    <Badge className="mb-2">{schedule.month}</Badge>
                    <h4 className="font-semibold text-sm">{schedule.focus}</h4>
                  </div>
                  <div className="space-y-1">
                    {schedule.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-start">
                        <div className="w-1 h-1 bg-accent rounded-full mr-2 mt-2"></div>
                        <span className="text-xs text-muted-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Teaching Career?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join our comprehensive year-long professional development program and become a leader in coding education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold"
              data-testid="button-start-enrollment"
            >
              Start Enrollment Process
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground px-8 py-4 text-lg font-semibold"
              data-testid="button-speak-advisor"
            >
              Speak with Advisor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}