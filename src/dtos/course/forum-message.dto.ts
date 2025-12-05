/**
 * Forum Message DTOs
 */

export interface ForumMessageInDTO {
	forumId: string;
	userId: string;
	content: string;
	parentMessageId: string | null;
}

export interface ForumMessageUpdateDTO {
	content?: string;
}

export interface ForumMessageOutDTO {
	idMessage: string;
	forumId: string;
	userId: string;
	content: string;
	parentMessageId: string | null;
	createdAt: Date;
	updatedAt: Date | null;
}
