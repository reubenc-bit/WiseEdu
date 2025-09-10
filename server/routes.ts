import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertCourseSchema, insertLessonSchema, insertUserProgressSchema, insertProjectSchema } from "@shared/schema";
import bcrypt from "bcrypt";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Sign up endpoint
  app.post('/api/auth/signup', async (req: any, res) => {
    try {
      const { email, password, firstName, lastName, role = 'student', market = 'south-africa' } = req.body;
      
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        market
      });

      // Set up session for email/password auth
      req.session.userId = user.id;
      req.session.isAuthenticated = true;
      // Return sanitized user data without password
      const { password: _, ...sanitizedUser } = user;
      res.json({ message: "User created successfully", user: sanitizedUser });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Sign in endpoint
  app.post('/api/auth/signin', async (req: any, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Find user
      const user = await storage.getUserByEmail(email);
      if (!user || !user.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Set up session for email/password auth
      req.session.userId = user.id;
      req.session.isAuthenticated = true;
      // Return sanitized user data without password
      const { password: _, ...sanitizedUser } = user;
      res.json({ message: "Signed in successfully", user: sanitizedUser });
    } catch (error) {
      console.error('Signin error:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Logout endpoint
  app.post('/api/auth/logout', (req: any, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie('connect.sid');
      res.json({ message: "Logged out successfully" });
    });
  });

  // Auth routes
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      // Check for email/password auth session first
      if (req.session?.userId && req.session?.isAuthenticated) {
        const user = await storage.getUser(req.session.userId);
        if (user) {
          // Sanitize user data - remove sensitive fields
          const { password, ...sanitizedUser } = user;
          return res.json(sanitizedUser);
        }
      }

      // Check for Replit auth (only in Replit environment)
      if (req.isAuthenticated && req.isAuthenticated() && req.user?.claims?.sub) {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);
        if (user) {
          // Sanitize user data - remove sensitive fields
          const { password, ...sanitizedUser } = user;
          return res.json(sanitizedUser);
        }
      }

      res.json(null);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Custom authentication middleware for both session and Replit auth
  const requireAuth = async (req: any, res: any, next: any) => {
    try {
      // Check email/password session auth first
      if (req.session?.userId && req.session?.isAuthenticated) {
        const user = await storage.getUser(req.session.userId);
        if (user) {
          req.user = { id: user.id, claims: { sub: user.id } };
          return next();
        }
      }

      // Check Replit auth (only in Replit environment)
      if (req.isAuthenticated && req.isAuthenticated() && req.user?.claims?.sub) {
        return next();
      }

      return res.status(401).json({ message: "Authentication required" });
    } catch (error) {
      console.error("Auth middleware error:", error);
      return res.status(500).json({ message: "Authentication error" });
    }
  };

  // Course routes (protected)
  app.get('/api/courses', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { ageGroup } = req.query;
      const courses = await storage.getCourses(user.market, ageGroup as string);
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get('/api/courses/:id', requireAuth, async (req: any, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  app.post('/api/courses', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const user = await storage.getUser(userId);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
      }

      const courseData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Failed to create course" });
    }
  });

  // Lesson routes (protected)
  app.get('/api/courses/:courseId/lessons', requireAuth, async (req: any, res) => {
    try {
      const lessons = await storage.getLessons(req.params.courseId);
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).json({ message: "Failed to fetch lessons" });
    }
  });

  app.get('/api/lessons/:id', requireAuth, async (req: any, res) => {
    try {
      const lesson = await storage.getLesson(req.params.id);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error) {
      console.error("Error fetching lesson:", error);
      res.status(500).json({ message: "Failed to fetch lesson" });
    }
  });

  // Progress routes (protected)
  app.get('/api/progress', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const { courseId } = req.query;
      const progress = await storage.getUserProgress(userId, courseId as string);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.post('/api/progress', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const progressData = insertUserProgressSchema.parse({
        ...req.body,
        userId,
      });
      const progress = await storage.updateUserProgress(progressData);
      res.json(progress);
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // Project routes (protected)
  app.get('/api/projects', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const projects = await storage.getUserProjects(userId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post('/api/projects', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const projectData = insertProjectSchema.parse({
        ...req.body,
        userId,
      });
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.put('/api/projects/:id', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const project = await storage.getProject(req.params.id);
      if (!project || project.userId !== userId) {
        return res.status(404).json({ message: "Project not found" });
      }

      const projectData = insertProjectSchema.partial().parse(req.body);
      const updatedProject = await storage.updateProject(req.params.id, projectData);
      res.json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  // Achievement routes (protected)
  app.get('/api/achievements', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  // Teacher routes (protected)
  app.get('/api/teacher/students', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const user = await storage.getUser(userId);
      if (!user || user.role !== 'teacher') {
        return res.status(403).json({ message: "Forbidden" });
      }

      const students = await storage.getStudentsByTeacher(userId);
      res.json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: "Failed to fetch students" });
    }
  });

  app.get('/api/teacher/certifications', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const user = await storage.getUser(userId);
      if (!user || user.role !== 'teacher') {
        return res.status(403).json({ message: "Forbidden" });
      }

      const certifications = await storage.getTeacherCertifications(userId);
      res.json(certifications);
    } catch (error) {
      console.error("Error fetching certifications:", error);
      res.status(500).json({ message: "Failed to fetch certifications" });
    }
  });

  // Parent routes (protected)
  app.get('/api/parent/children', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const user = await storage.getUser(userId);
      if (!user || user.role !== 'parent') {
        return res.status(403).json({ message: "Forbidden" });
      }

      const children = await storage.getChildrenByParent(userId);
      res.json(children);
    } catch (error) {
      console.error("Error fetching children:", error);
      res.status(500).json({ message: "Failed to fetch children" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
