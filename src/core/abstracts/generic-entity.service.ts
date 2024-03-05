import { Logger, NotFoundException } from '@nestjs/common';
import { GenericRepository } from './generic-repository';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedData } from '../interfaces';

export abstract class GenericEntityService<T> {
  protected name: string;
  protected logger: Logger;

  protected constructor(
    protected repository: GenericRepository<T>,
    name: string,
  ) {
    this.name = name;
    this.logger = new Logger(`GenericService ${this.name}`);
  }

  public async create(createInput: T): Promise<T> {
    try {
      this.logger.debug({ message: 'Operation create', createInput });
      return await this.repository.create(createInput);
    } catch (err) {
      this.logger.error({ message: `ERROR: operation create` });
      this.logger.error(err);
    }
  }

  public async findAll(): Promise<T[]> {
    try {
      this.logger.debug({ message: 'Operation findAll' });
      return await this.repository.getAll();
    } catch (err) {
      this.logger.error({ message: 'ERROR: operation findAll' });
      this.logger.error(err);
    }
  }

  public async findAllPaginated(pagination?: PaginationDto, filters: any = {}): Promise<PaginatedData<T>> {
    try {
      this.logger.debug({
        message: 'Operation findAllPaginated',
        pagination,
        filters,
      });
      return await this.repository.getAllPaginated(pagination, filters);
    } catch (err) {
      this.logger.error({
        message: 'ERROR: operation findAllPaginated',
        pagination,
        filters,
      });
      this.logger.error(err);
    }

    // return null;
  }

  public async findById(id: string): Promise<T> {
    try {
      this.logger.debug({ message: 'Operation findById', id });
      return await this.repository.getById(id);
    } catch (err) {
      this.logger.error({ message: 'ERROR: operation findById', id });
      this.logger.error(err);
    }
  }

  public async findOne(filters: any = {}): Promise<T> {
    try {
      this.logger.debug({ message: 'Operation findOne', filters });
      return await this.repository.findOne(filters);
    } catch (err) {
      this.logger.error({ message: 'ERROR: operation findOne', filters });
      this.logger.error(err);
    }
  }

  public async findByFilter(filters: any = {}): Promise<T[]> {
    try {
      this.logger.debug({ message: 'Operation findByFilter', filters });
      return await this.repository.findByFilter(filters);
    } catch (err) {
      this.logger.error({ message: 'ERROR: operation findByFilter', filters });
      this.logger.error(err);
    }
  }

  public async update(id: string, updateInput: T): Promise<T> {
    try {
      this.logger.debug({ message: 'Operation update', id, updateInput });
      const data = await this.repository.getById(id);
      if (!data) throw new NotFoundException('Resource not found');
      return await this.repository.update(id, updateInput);
    } catch (err) {
      this.logger.error({
        message: 'ERROR: operation findOne',
        id,
        updateInput,
      });
      this.logger.error(err);
      throw err;
    }
  }

  public async remove(id: string): Promise<T> {
    try {
      this.logger.debug({ message: 'Operation remove', id });
      const data = await this.repository.getById(id);
      if (!data) throw new NotFoundException('Resource not found');
      return await this.repository.delete(id);
    } catch (err) {
      this.logger.error({ message: 'ERROR: operation remove', id });
      this.logger.error(err);
      throw err;
    }
  }
}
