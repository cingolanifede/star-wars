import { PaginationOrderDir } from '../enums/pagination';

export interface PagingMeta {
  count: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
}

export interface PaginatedData<T> {
  pagingMeta: PagingMeta;
  data: T[];
}

export interface IPaginationDto {
  limit?: number;
  skip?: number;
  orderBy?: string;
  orderByDir?: PaginationOrderDir;
  search?: string;
}
