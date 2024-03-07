import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CharacterService } from '../../../service/character.service';
import { CharacterFactory } from '../../../character.factory';
import { PlanetService } from '../../../../planet/service/planet.service';
import {
  CharacterInput,
  CharacterInputPaginationDto,
  CharacterUpdateInput,
} from '../dtos/input/character.input';
import { Character } from '../../../entities/character.entity';
import {
  CharacterOutput,
  CharacterPagingOutput,
} from '../dtos/output/character.output';
import { PlanetOutput } from '../../../../planet/infrastructure/graphql/dtos/output/Planet';
import { IdOutput } from '../../../../../core/graphql/identity.dto';

@Resolver(() => CharacterOutput)
export class CharacterResolver {
  constructor(
    private readonly characterService: CharacterService,
    private readonly planetService: PlanetService,
  ) {}

  @Query(() => CharacterPagingOutput, { name: 'characters' })
  async getPaginated(
    @Args('pagination') pagination: CharacterInputPaginationDto,
  ) {
    return await this.characterService.findPaginated(pagination);
  }

  @Query(() => CharacterOutput, { name: 'characterById' })
  async getById(@Args('id') id: string): Promise<CharacterOutput> {
    return await this.characterService.findById(id);
  }

  @Mutation(() => CharacterOutput, { name: 'createCharacter' })
  async crateCharacter(
    @Args('input') input: CharacterInput,
  ): Promise<CharacterOutput> {
    const newCharacter = CharacterFactory.create(input);
    return await this.characterService.create(newCharacter);
  }

  @Mutation(() => CharacterOutput, { name: 'updateCharacter' })
  async update(
    @Args('input') input: CharacterUpdateInput,
  ): Promise<CharacterOutput> {
    const planet = CharacterFactory.create(input);
    return await this.characterService.update(input.id, planet);
  }

  @Mutation(() => IdOutput, { name: 'removeCharacter' })
  async remove(@Args('id') id: string) {
    return await this.characterService.remove(id);
  }

  @ResolveField('location', () => PlanetOutput)
  async planets(@Parent() character: Character) {
    const { location } = character;
    if (location) return await this.planetService.findOne({ _id: location });
  }
}
