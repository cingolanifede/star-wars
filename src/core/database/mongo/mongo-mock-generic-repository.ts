/* eslint-disable @typescript-eslint/ban-types */
import { FilterQuery, Model } from 'mongoose';
import { paginateData } from './mongo-pagination';
import { GenericRepository } from '../../abstracts/generic-repository';
import { PaginationDto } from '../../dto/pagination.dto';
import { PaginatedData } from '../../interfaces';

export class MongoGenericRepository<T> implements GenericRepository<T> {
  protected readonly repository: Model<T>;
  protected readonly populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this.repository = repository;
    this.populateOnFind = populateOnFind;
  }

  getAll(): Promise<T[]> {
    return this.repository.find(
      {},
      {},
      {
        populate: this.populateOnFind,
      },
    );
  }

  getAllPaginated(
    options?: PaginationDto,
    filters?: {},
  ): Promise<PaginatedData<T>> {
    return paginateData(
      {
        pagination: options,
        model: this.repository,
      },
      filters,
    );
  }

  getById(id: string): Promise<T> {
    return this.repository.findById(id, {}, { populate: this.populateOnFind });
  }

  findOne(filters: FilterQuery<T>): Promise<T> {
    return this.repository.findOne(
      filters,
      {},
      { populate: this.populateOnFind },
    );
  }

  findByFilter(filters: FilterQuery<T>): Promise<T[]> {
    return this.repository.find(filters, {}, { populate: this.populateOnFind });
  }

  create(entity: T): Promise<T> {
    return this.repository.create(entity);
  }

  update(id: string, entity: T): Promise<T> {
    return this.repository.findByIdAndUpdate(id, entity, {
      new: true,
      populate: this.populateOnFind,
    });
  }

  delete(id: string): Promise<T> {
    return this.repository.findByIdAndDelete(id, {
      populate: this.populateOnFind,
      new: true,
    });
  }
}
