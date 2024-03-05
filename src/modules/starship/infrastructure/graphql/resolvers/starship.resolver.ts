import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { StarshipFactory } from '../../../starship.factory';
import {
  DistanceInput,
  EnemiesCheckInput,
  StarshipInput,
  StarshipInputPaginationDto,
  StarshipUpdateInput,
  ToStarshipInput,
} from '../dtos/input/starship.input';
import {
  DistanceOutput,
  StarshipOutput,
  StarshipPagingOutput,
} from '../dtos/output/starship.output';
import { PlanetOutput } from '../../../../planet/infrastructure/graphql/dtos/output/Planet';
import { IdOutput } from '../../../../../core/graphql/identity.dto';
import { CharacterService } from '../../../../character/service/character.service';
import { StarshipService } from '../../../service/starship.service';
import { Starship } from '../../../entities/starship.entity';
import { CharacterOutput } from '../../../../character/infrastructure/graphql/dtos/output/character.output';

@Resolver(() => StarshipOutput)
export class StarshipResolver {
  constructor(
    private readonly starshipService: StarshipService,
    private readonly characterService: CharacterService,
  ) {}

  @Query(() => StarshipPagingOutput, { name: 'starships' })
  async getPaginated(
    @Args('pagination') pagination: StarshipInputPaginationDto,
  ) {
    return await this.starshipService.findPaginated(pagination);
  }

  @Query(() => StarshipOutput, { name: 'starshipById' })
  async getById(@Args('id') id: string): Promise<StarshipOutput> {
    return await this.starshipService.findById(id);
  }

  @Mutation(() => StarshipOutput, { name: 'createStarship' })
  async crateCharacter(
    @Args('input') input: StarshipInput,
  ): Promise<StarshipOutput> {
    const newCharacter = StarshipFactory.create(input);
    return await this.starshipService.create(newCharacter);
  }

  @Mutation(() => StarshipOutput, { name: 'updateStarship' })
  async update(
    @Args('input') input: StarshipUpdateInput,
  ): Promise<StarshipOutput> {
    const planet = StarshipFactory.create(input);
    return await this.starshipService.update(input.id, planet);
  }

  @Mutation(() => IdOutput, { name: 'removeStarship' })
  async remove(@Args('id') id: string) {
    return await this.starshipService.remove(id);
  }

  @Mutation(() => StarshipOutput, { name: 'boardingToShip' })
  async addToStarship(
    @Args('input') input: ToStarshipInput,
  ): Promise<StarshipOutput> {
    return await this.starshipService.addToStarship(input);
  }

  @Mutation(() => StarshipOutput, { name: 'disembarkingToShip' })
  async removeToStarship(
    @Args('input') input: ToStarshipInput,
  ): Promise<StarshipOutput> {
    return await this.starshipService.removeToStarship(input);
  }

  @Mutation(() => DistanceOutput, { name: 'calculateDistance' })
  async calculateDistance(
    @Args('input') input: DistanceInput,
  ): Promise<{ distance: number }> {
    return await this.starshipService.getDistance(input);
  }

  @Mutation(() => [StarshipOutput], { name: 'checkForEnemies' })
  async checkForEnemies(
    @Args('input') input: EnemiesCheckInput,
  ): Promise<Starship[]> {
    return await this.starshipService.getEnemies(input);
  }

  /**Seed */
  @Mutation(() => [StarshipOutput], { name: 'spawnEnemyShips' })
  async spawnEnemyShips(
    @Args('input') input: EnemiesCheckInput,
  ): Promise<Starship[]> {
    return await this.starshipService.getEnemies(input);
  }

  /**ResolvedFields  */
  @ResolveField('passengers', () => [CharacterOutput], { nullable: true })
  async passengers(@Parent() starship: Starship) {
    if (starship?.passengers)
      return this.characterService.findByFilter({
        _id: { $in: starship.passengers },
      });
  }

  @ResolveField('enemies', () => [PlanetOutput], { nullable: true })
  async enemies(@Parent() starship: Starship) {
    if (starship?.enemies)
      return this.starshipService.findByFilter({
        _id: { $in: starship.enemies },
      });
  }
}
