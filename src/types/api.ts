export interface ApiError {
  message: string;
  statusCode?: number | undefined;
  code?: string | undefined;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SingleResponse<T> {
  data: T;
}

export interface ApiResponse<T> {
  data: T;
  meta?:
    | {
        page?: number | undefined;
        limit?: number | undefined;
        total?: number | undefined;
      }
    | undefined;
}

export interface ProjectQueryParams {
  category?: string | undefined;
  search?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
  featured?: boolean | undefined;
}

export interface JournalQueryParams {
  category?: string | undefined;
  search?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

export interface CreateInquiryDto {
  fullName: string;
  email: string;
  company?: string | undefined;
  projectType?: string | undefined;
  message: string;
}

export interface CreateConfigurationDto {
  productId?: string | undefined;
  materialId?: string | undefined;
  gemstoneId?: string | undefined;
  metal?: string | undefined;
  gemstone?: string | undefined;
  cut: string;
  finish: string;
}

export interface CreateProjectDto {
  title: string;
  slug?: string | undefined;
  description: string;
  category: string;
  imageUrl: string;
  modelUrl?: string | undefined;
  service?: string | undefined;
  format?: string | undefined;
  year?: string | undefined;
  featured?: boolean | undefined;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {}
