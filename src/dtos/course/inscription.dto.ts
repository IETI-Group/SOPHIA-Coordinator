export interface InscriptionInDTO {
	userId: string;
	courseId: string;
}

export interface InscriptionUpdateDTO {
	progressPercentage?: number;
	score?: number | null;
	active?: boolean;
}

export interface InscriptionOutDTO {
	idInscription: string;
	userId: string;
	courseId: string;
	progressPercentage: number;
	score: number | null;
	active: boolean;
	createdAt: Date;
}
