import type { VERIFICATION_STATUS } from "../common/enums";

export type InstructorInput = {
	instructorId: string;
	verificationStatus?: VERIFICATION_STATUS;
	verifiedAt?: Date;
};

export type InstructorRecord = {
	id_instructor: string;
	total_students: number;
	total_courses: number;
	average_rating: string;
	total_reviews: number;
	verification_status: VERIFICATION_STATUS;
	verified_at: Date | null;
};
