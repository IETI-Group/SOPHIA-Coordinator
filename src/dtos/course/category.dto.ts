export interface CategoryCourseInDTO {
	name: string;
	description: string;
	parentCategory: string | null;
}

export interface CategoryCourseUpdateDTO extends CategoryCourseInDTO {
	active: boolean;
}

export interface CategoryCourseOutDTO extends CategoryCourseUpdateDTO {
	idCategory: string;
}

export interface TagCourseInDTO {
	categoryId: string;
	courseId: string;
}

export interface TagCourseOutDTO extends TagCourseInDTO {
	createdAt: Date;
	name: string;
}
