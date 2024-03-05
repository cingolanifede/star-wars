import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedData } from '../interfaces';

export abstract class GenericRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract getAllPaginated(pagination: PaginationDto, filters?: any): Promise<PaginatedData<T>>;

  abstract getById(id: string): Promise<T>;

  abstract findOne(filters: any): Promise<T>;

  abstract findByFilter(filters: any): Promise<T[]>;

  abstract create(entity: T): Promise<T>;

  abstract update(id: string, entity: T): Promise<T>;

  abstract delete(id: string): Promise<T>;
}
