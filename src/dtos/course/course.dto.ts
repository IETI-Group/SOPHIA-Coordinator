import { COURSE_LEVEL, COURSE_STATUS } from '../common/enums.js';

type Json = Record<string, any>;

export interface CourseInDTO {
  instructorId: string | null;
  title: string;
  description: string;
  price: number;
  level: COURSE_LEVEL;
  aiGenerated: boolean;
  generationTaskId: string | null;
  generationMetadata: Json;
  lastAIUpdateAt: Date | null;
}

export interface CourseUpdateDTO extends CourseInDTO {
  active: boolean;
  status: COURSE_STATUS;
}

export interface CourseLightDTO {
  idCourse: string;
  instructorId: string | null;
  title: string;
  price: number;
  level: COURSE_LEVEL;
  active: boolean;
  averageReviews: number;
  durationHours: number;
  totalLessons: number;
  status: COURSE_STATUS;
  updatedAt: Date | null;
  createdAt: Date;
  totalReviews: number;
  totalEnrollments: number;
  publishedAt: Date | null;
}

export interface CourseHeavyDTO extends CourseLightDTO {
  description: string;
  aiGenerated: boolean;
  generationTaskId: string | null;
  generationMetadata: Json;
  lastAIUpdateAt: Date | null;
}

export interface InscriptionCourseInDTO {
  userId: string;
  courseId: string;
}

export interface InscriptionCourseUpdateDTO extends InscriptionCourseInDTO {
  progressPercentage: number;
  score: number | null;
  active: boolean;
}

export interface InscriptionCourseOutDTO extends InscriptionCourseUpdateDTO {
  idInscription: string;
  createdAt: Date;
  completed: boolean;
}

export interface FavoriteCourseInDTO {
  userId: string;
  courseId: string;
}

export interface FavoriteCourseOutDTO extends FavoriteCourseInDTO {
  createdAt: Date;
  courseTitle: string;
  courseAverageReviews: number;
  courseTotalEnrollments: number;
  courseLevel: COURSE_LEVEL;
}
