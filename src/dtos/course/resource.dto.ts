import { DISCRIMINANT_RESOURCE, RESOURCE_TYPE } from '../common/enums';

type Json = Record<string, any>;

export interface ResourcesInDTO {
  entityReference: string;
  discriminant: DISCRIMINANT_RESOURCE;
  name: string;
  type: RESOURCE_TYPE;
  url: string | null;
  content: string | null;
  order: number;
  durationSeconds: number;
  fileSizeMb: number;
  mimeType: string | null;
  thumnailUrl: string | null;
  metadata: Json;
}

export interface ResourcesOutLightDTO {
  idResource: string;
  entityReference: string;
  discriminant: DISCRIMINANT_RESOURCE;
  name: string;
  type: RESOURCE_TYPE;
  url: string | null;
  content: string | null;
  order: number;
  durationSeconds: number;
  fileSizeMb: number;
}

export interface ResourcesOutHeavyDTO extends ResourcesOutLightDTO {
  mimeType: string | null;
  thumnailUrl: string | null;
  metadata: Json;
}
