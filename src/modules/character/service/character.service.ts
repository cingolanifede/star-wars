import { Inject, Injectable } from '@nestjs/common';
import { GenericEntityService } from '../../../core/abstracts/generic-entity.service';
import { Character } from '../entities/character.entity';
import { CharacterRepository } from '../character.repository';
import { CharacterInputPaginationDto } from '../infrastructure/graphql/dtos/input/character.input';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CharacterService extends GenericEntityService<Character> {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    protected readonly repository: CharacterRepository,
  ) {
    super(repository, Character.name);
  }

  create(character: Character) {
    this.logger.log({ message: 'create', character });
    return this.repository.create(character);
  }

  async findPaginated(pagination: CharacterInputPaginationDto) {
    const { paging } = pagination;
    return super.findAllPaginated(
      paging,
      pagination?.args ? pagination?.args : null,
    );
  }

  async findById(id: string): Promise<Character> {
    const cachedData = await this.cacheService.get<Character>(id);
    if (cachedData) return cachedData;

    const character = await this.repository.findOne({ _id: id });
    await this.cacheService.set(id, character);
    return character;
  }
}
