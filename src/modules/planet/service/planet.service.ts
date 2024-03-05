import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { GenericEntityService } from '@/core/abstracts/generic-entity.service';
import { Planet } from '../entities/planet.entity';
import { PlanetRepository } from '../planet.repository';
import { PlanetInputPaginationDto } from '../infrastructure/graphql/dtos/input/Planet';

@Injectable()
export class PlanetService extends GenericEntityService<Planet> {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    protected readonly repository: PlanetRepository,
  ) {
    super(repository, Planet.name);
  }

  async create(planet: Planet) {
    this.logger.log({ message: 'create', planet });
    return this.repository.create(planet);
  }

  async findPaginated(pagination: PlanetInputPaginationDto) {
    const { paging } = pagination;
    return super.findAllPaginated(
      paging,
      pagination?.args ? pagination?.args : null,
    );
  }

  async findById(id: string): Promise<Planet> {
    const cachedData = await this.cacheService.get<Planet>(id);
    if (cachedData) return cachedData;
    console.log('cachedData:', cachedData);
    const planet = await this.repository.findOne({ _id: id });
    await this.cacheService.set(id, planet);
    return planet;
  }
}
