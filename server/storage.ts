import {
  users,
  courses,
  lessons,
  userProgress,
  projects,
  achievements,
  userAchievements,
  teacherCertifications,
  classEnrollments,
  parentChildRelationships,
  type User,
  type UpsertUser,
  type Course,
  type InsertCourse,
  type Lesson,
  type InsertLesson,
  type UserProgress,
  type InsertUserProgress,
  type Project,
  type InsertProject,
  type Achievement,
  type UserAchievement,
  type TeacherCertification,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Course operations
  getCourses(market: string, ageGroup?: string): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Lesson operations
  getLessons(courseId: string): Promise<Lesson[]>;
  getLesson(id: string): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  
  // Progress operations
  getUserProgress(userId: string, courseId?: string): Promise<UserProgress[]>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // Project operations
  getUserProjects(userId: string): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  
  // Achievement operations
  getUserAchievements(userId: string): Promise<(UserAchievement & { achievement: Achievement })[]>;
  
  // Teacher operations
  getTeacherCertifications(teacherId: string): Promise<TeacherCertification[]>;
  getStudentsByTeacher(teacherId: string): Promise<User[]>;
  
  // Parent operations
  getChildrenByParent(parentId: string): Promise<User[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Course operations
  async getCourses(market: string, ageGroup?: string): Promise<Course[]> {
    const conditions = [
      eq(courses.market, market as any),
      eq(courses.isPublished, true)
    ];
    
    if (ageGroup) {
      conditions.push(eq(courses.ageGroup, ageGroup));
    }
    
    return await db
      .select()
      .from(courses)
      .where(and(...conditions))
      .orderBy(asc(courses.title));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(course).returning();
    return newCourse;
  }

  // Lesson operations
  async getLessons(courseId: string): Promise<Lesson[]> {
    return await db
      .select()
      .from(lessons)
      .where(
        and(
          eq(lessons.courseId, courseId),
          eq(lessons.isPublished, true)
        )
      )
      .orderBy(asc(lessons.order));
  }

  async getLesson(id: string): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson;
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const [newLesson] = await db.insert(lessons).values(lesson).returning();
    return newLesson;
  }

  // Progress operations
  async getUserProgress(userId: string, courseId?: string): Promise<UserProgress[]> {
    const conditions = [eq(userProgress.userId, userId)];
    
    if (courseId) {
      conditions.push(eq(userProgress.courseId, courseId));
    }
    
    return await db
      .select()
      .from(userProgress)
      .where(and(...conditions))
      .orderBy(desc(userProgress.updatedAt));
  }

  async updateUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const [existingProgress] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, progress.userId!),
          eq(userProgress.courseId, progress.courseId!),
          eq(userProgress.lessonId, progress.lessonId!)
        )
      );

    if (existingProgress) {
      const [updatedProgress] = await db
        .update(userProgress)
        .set({
          ...progress,
          updatedAt: new Date(),
        })
        .where(eq(userProgress.id, existingProgress.id))
        .returning();
      return updatedProgress;
    } else {
      const [newProgress] = await db.insert(userProgress).values(progress).returning();
      return newProgress;
    }
  }

  // Project operations
  async getUserProjects(userId: string): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(desc(projects.updatedAt));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project> {
    const [updatedProject] = await db
      .update(projects)
      .set({
        ...project,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  // Achievement operations
  async getUserAchievements(userId: string): Promise<(UserAchievement & { achievement: Achievement })[]> {
    return await db
      .select({
        id: userAchievements.id,
        userId: userAchievements.userId,
        achievementId: userAchievements.achievementId,
        earnedAt: userAchievements.earnedAt,
        achievement: achievements,
      })
      .from(userAchievements)
      .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
      .where(eq(userAchievements.userId, userId))
      .orderBy(desc(userAchievements.earnedAt));
  }

  // Teacher operations
  async getTeacherCertifications(teacherId: string): Promise<TeacherCertification[]> {
    return await db
      .select()
      .from(teacherCertifications)
      .where(eq(teacherCertifications.teacherId, teacherId))
      .orderBy(desc(teacherCertifications.issueDate));
  }

  async getStudentsByTeacher(teacherId: string): Promise<User[]> {
    return await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        profileImageUrl: users.profileImageUrl,
        role: users.role,
        market: users.market,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(classEnrollments)
      .innerJoin(users, eq(classEnrollments.studentId, users.id))
      .where(eq(classEnrollments.teacherId, teacherId));
  }

  // Parent operations
  async getChildrenByParent(parentId: string): Promise<User[]> {
    return await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        profileImageUrl: users.profileImageUrl,
        role: users.role,
        market: users.market,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(parentChildRelationships)
      .innerJoin(users, eq(parentChildRelationships.childId, users.id))
      .where(eq(parentChildRelationships.parentId, parentId));
  }
}

export const storage = new DatabaseStorage();
