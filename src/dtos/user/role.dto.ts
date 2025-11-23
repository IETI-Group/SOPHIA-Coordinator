import type { ROLE, ROLE_STATUS } from "../common/enums";

export type RoleInput = {
	name: ROLE;
	description?: string;
};

export type RoleRecord = {
	id_role: string;
	name: ROLE;
	description: string | null;
};

export type RoleAssignationInput = {
	userId: string;
	role: ROLE;
	expiresAt?: Date;
	status?: ROLE_STATUS;
};

export type RoleAssignationRecord = {
	id_user_role: string;
	user_id: string;
	role_id: string;
	role_name: ROLE;
	assigned_at: Date;
	expires_at: Date | null;
	status: ROLE_STATUS;
};
