import { REVIEW_DISCRIMINANT } from '../common/enums.js';

export interface ReviewInDTO {
  reviewerId: string;
  reviewedId: string;
  discriminant: REVIEW_DISCRIMINANT;
  rate: number;
  recommended: boolean;
  comments?: string;
}

export interface ReviewOutDTO extends ReviewInDTO {
  reviewerId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
