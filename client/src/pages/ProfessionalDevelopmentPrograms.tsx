import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Presentation,
  X
} from "lucide-react";
import { useMarket } from "@/contexts/MarketContext";
import { useToast } from "@/hooks/use-toast";

export default function ProfessionalDevelopmentPrograms() {
  const { market } = useMarket();
  const { toast } = useToast();
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    role: '',
    experience: '',
    program: '',
    motivation: ''
  });

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEnrollmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Enrollment Submitted!",
      description: "Thank you for your interest. We'll contact you within 2 business days to discuss next steps.",
    });

    // Reset form and close modal
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      school: '',
      role: '',
      experience: '',
      program: '',
      motivation: ''
    });
    setShowEnrollmentForm(false);
  };

  const openEnrollmentForm = (selectedProgram?: string) => {
    if (selectedProgram) {
      setFormData(prev => ({ ...prev, program: selectedProgram }));
    }
    setShowEnrollmentForm(true);
  };

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
                onClick={() => openEnrollmentForm()}
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
                        onClick={() => openEnrollmentForm(program.title)}
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
              onClick={() => openEnrollmentForm()}
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

      {/* Custom Enrollment Form Modal */}
      {showEnrollmentForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">Program Enrollment Application</CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowEnrollmentForm(false)}
                data-testid="button-close-enrollment"
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEnrollmentSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
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
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Professional Information</h3>
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
                    <Label htmlFor="role">Current Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger data-testid="select-role">
                        <SelectValue placeholder="Select your current role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="principal">Principal</SelectItem>
                        <SelectItem value="head-of-department">Head of Department</SelectItem>
                        <SelectItem value="curriculum-specialist">Curriculum Specialist</SelectItem>
                        <SelectItem value="administrator">Administrator</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Teaching Experience</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger data-testid="select-experience">
                        <SelectValue placeholder="Select your teaching experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16+">16+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Program Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Program Selection</h3>
                  <div>
                    <Label htmlFor="program">Preferred Program</Label>
                    <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                      <SelectTrigger data-testid="select-program">
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Foundation Certificate Program">Foundation Certificate Program</SelectItem>
                        <SelectItem value="Advanced Diploma Program">Advanced Diploma Program</SelectItem>
                        <SelectItem value="Master Educator Program">Master Educator Program</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="motivation">Why are you interested in this program?</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                      placeholder="Tell us about your motivation and goals..."
                      rows={4}
                      data-testid="textarea-motivation"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    data-testid="button-submit-enrollment"
                  >
                    Submit Application
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowEnrollmentForm(false)}
                    data-testid="button-cancel-enrollment"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}