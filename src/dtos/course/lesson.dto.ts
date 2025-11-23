import type {
	DIFFICULTY_LEVEL,
	LEARNING_TECHNIQUE,
	LESSON_CONTENT_TYPE,
	LESSON_TYPE,
} from "../common/enums";

type Json = Record<string, any>;

export interface LessonSectionInDTO {
	sectionId: string;
	title: string;
	description: string;
	order: number;
	durationMinutes: number;
	aiGenerated: boolean;
	generationTaskId: string | null;
	lessonType: LESSON_TYPE;
	estimatedDifficulty: number;
}

export interface LessonSectionUpdateDTO extends LessonSectionInDTO {
	active: boolean;
}

export interface LessonSectionOutLightDTO {
	idLesson: string;
	active: boolean;
	createdAt: Date;
	sectionId: string;
	title: string;
	order: number;
	durationMinutes: number;
	lessonType: LESSON_TYPE;
}

export interface LessonSectionOutHeavyDTO extends LessonSectionOutLightDTO {
	description: string;
	aiGenerated: boolean;
	generationTaskId: string | null;
	estimatedDifficulty: number;
}

export interface ContentLessonInDTO {
	lessonId: string;
	metadata: Json;
	difficultyLevel: DIFFICULTY_LEVEL;
	learningTechnique: LEARNING_TECHNIQUE;
	orderPreference: number | null;
	aiGenerated: boolean;
	generationLogId: string | null;
	contentType: LESSON_CONTENT_TYPE;
	parentContentId: string | null;
}

export interface ContentLessonUpdateDTO extends ContentLessonInDTO {
	active: boolean;
	isCurrentVersion: boolean;
}

export interface ContentLessonOutLightDTO {
	idLessonContent: string;
	version: number;
	lessonId: string;
	active: boolean;
	isCurrentVersion: boolean;
	difficultyLevel: DIFFICULTY_LEVEL;
	learningTechnique: LEARNING_TECHNIQUE;
	orderPreference: number | null;
	createdAt: Date;
}

export interface ContentLessonOutHeavyDTO extends ContentLessonOutLightDTO {
	metadata: Json;
	aiGenerated: boolean;
	generationLogId: string | null;
	contentType: LESSON_CONTENT_TYPE;
	parentContentId: string | null;
}

export interface ProgressContentInDTO {
	userId: string;
	lessonContentId: string;
}

export interface ProgressContentUpdateDTO extends ProgressContentInDTO {
	timeSpendMinutes: number;
	completionPercentage: number;
	effectivinessScore: number;
	active: boolean;
	userRating: number | null;
}

export interface ProgressContentOutDTO extends ProgressContentUpdateDTO {
	idContentProgress: string;
	startedAt: Date | null;
	completedAt: Date | null;
}
