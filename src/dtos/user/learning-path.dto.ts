import { LEARNING_STYLES, PACE_PREFERENCE } from '../common/enums';

export interface LearningPathInDTO {
  primaryStyle: LEARNING_STYLES;
  secondaryStyle: LEARNING_STYLES;
  pacePreference: PACE_PREFERENCE;
  interactivityPreference: number;
  gamificationEnabled: boolean;
}

export interface LearningPathOutDTO extends LearningPathInDTO {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
