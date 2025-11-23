import type { ROLE } from "../common/enums";

export interface UserInDTO {
	email: string;
	firstName: string;
	lastName: string;
	birthDate: Date;
}

export interface UserOutDTO {
	userId: string;
	role: ROLE;
}

export interface UserUpdateDTO extends UserOutDTO {
	email: string;
	firstName: string;
	lastName: string;
	birthDate: Date;
	bio: string;
}

export interface UserHeavyOutDTO extends UserUpdateDTO {
	createdAt: Date;
	updatedAt: Date | null;
}
