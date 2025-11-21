export interface ApiRequestQuery {
  page: number;
  size: number;
  sort?: string;
  order: 'asc' | 'desc';
  lightDTO?: boolean;
}

export interface UsersQuery extends ApiRequestQuery {
  firstName?: string;
  lastName?: string;
  birthDayFrom?: Date;
  birthDayTo?: Date;
}

export interface ApiRequestBatchUsers extends ApiRequestQuery {
  users: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  timestamp: string;
  stack?: string;
}
