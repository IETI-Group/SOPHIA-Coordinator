type Json = Record<string, unknown>;

export interface QuizSectionInDTO {
	sectionId: string;
	description: string;
	title: string;
	aiGenerated: boolean;
	generationTaskId: string | null;
	difficultyDistribution: Json;
	adaptativeLogic: Json;
}

export interface QuizSectionUpdateDTO extends QuizSectionInDTO {
	active: boolean;
	durationMinutes: number;
}

export interface QuizSectionOutLightDTO {
	idQuiz: string;
	createdAt: Date;
	active: boolean;
	durationMinutes: number;
	sectionId: string;
	title: string;
}

export interface QuizSectionOutHeavyDTO extends QuizSectionOutLightDTO {
	description: string;
	aiGenerated: boolean;
	generationTaskId: string | null;
	difficultyDistribution: Json;
	adaptativeLogic: Json;
}

export interface QuestionQuizInDTO {
	quizId: string;
	question: string;
	durationMinutes: number;
}

export interface QuestionQuizOutDTO extends QuestionQuizInDTO {
	idQuizQuestion: string;
}

export interface OptionQuizInDTO {
	quizQuestionId: string;
	option: string;
	isCorrect: boolean;
}

export interface OptionQuizOutDTO extends OptionQuizInDTO {
	idQuizOption: string;
}

export interface AttemptQuizInDTO {
	quizId: string;
	userId: string;
}

export interface AttemptQuizUpdateDTO extends AttemptQuizInDTO {
	grade: number | null;
}

export interface AttemptQuizOutDTO extends AttemptQuizUpdateDTO {
	idQuizAttempt: string;
	submittedAt: Date;
	durationMinutes: number;
}
