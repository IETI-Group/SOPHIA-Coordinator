import type { ASSIGNMENT_TYPE, SUBMISSION_STATUS } from "../common/enums";

export interface AssignmentLessonInDTO {
	lessonId: string;
	title: string;
	instructions: string;
	maxFileSizeMb: number;
	allowedTypes: ASSIGNMENT_TYPE;
	dueDate: Date;
	maxScore: number;
}

export interface AssignmentLessonUpdateDTO extends AssignmentLessonInDTO {
	active: boolean;
}

export interface AssignmentLessonOutDTO extends AssignmentLessonUpdateDTO {
	idAssignment: string;
	createdAt: Date;
}

export interface SubmissionAssignmentInDTO {
	assignmentId: string;
	userId: string;
}

export interface SubmissionAssignmentUpdateDTO
	extends SubmissionAssignmentInDTO {
	feedback: string | null;
	active: boolean;
	score: number | null;
	status: SUBMISSION_STATUS;
}

export interface SubmissionAssignmentOutDTO
	extends SubmissionAssignmentUpdateDTO {
	idSubmission: string;
	gradedAt: Date | null;
	submittedAt: Date | null;
}
