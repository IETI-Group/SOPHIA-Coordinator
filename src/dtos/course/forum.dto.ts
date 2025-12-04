/**
 * Forum DTOs
 */

export interface ForumInDTO {
	courseId: string;
	active: boolean;
}

export interface ForumUpdateDTO {
	courseId?: string;
	active?: boolean;
	commentsCount?: number;
}

export interface ForumOutDTO {
	idForum: string;
	courseId: string;
	active: boolean;
	commentsCount: number;
	createdAt: Date;
}
