export interface SectionCourseInDTO {
  courseId: string;
  title: string;
  description: string;
  order: number;
  aiGenerated: boolean;
  generationTaskId: string | null;
  suggestedByAi: boolean;
}

export interface SectionCourseUpdateDTO extends SectionCourseInDTO {
  active: boolean;
}

export interface SectionCourseOutLightDTO {
  idSection: string;
  courseId: string;
  title: string;
  durationHours: number;
  createdAt: Date;
  active: boolean;
  order: number;
}

export interface SectionCourseOutHeavyDTO extends SectionCourseOutLightDTO {
  description: string;
  aiGenerated: boolean;
  generationTaskId: string | null;
  suggestedByAi: boolean;
}
