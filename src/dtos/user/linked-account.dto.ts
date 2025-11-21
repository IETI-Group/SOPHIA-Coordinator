export interface LinkedAccountInDTO {
  userId: string;
  provider: string;
  issuer: string;
  idExternal: string;
  email: string;
  isPrimary: boolean;
}

export interface LinkedAccountOutDTO extends LinkedAccountInDTO {
  idLinkedAccount: string;
  linkedAt: Date;
  emailVerified: boolean;
}
