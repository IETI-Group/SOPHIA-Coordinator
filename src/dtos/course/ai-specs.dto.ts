type Json = Record<string, any>;

export interface AISpecsLessonInDTO {
	lessonContentId: string;
	generationPromptSummary: string;
	contentStructure: Json;
	estimatedVideoDurationMinutes: number | null;
	videoScript: string | null;
	videoGenerationInstructions: Json;
	interactiveElements: Json | null;
	exerciseParameters: Json | null;
}

export interface AISpecsLessonOutLightDTO {
	idLessonSpec: string;
	createdAt: Date;
	lessonContentId: string;
	generationPromptSummary: string;
	contentStructure: Json;
	estimatedVideoDurationMinutes: number | null;
}

export interface AISpecsLessonOutHeavyDTO extends AISpecsLessonOutLightDTO {
	videoScript: string | null;
	videoGenerationInstructions: Json;
	interactiveElements: Json;
	exerciseParameters: Json;
}
