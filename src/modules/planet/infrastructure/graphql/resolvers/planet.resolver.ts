import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PlanetOutput, PlanetPagingOutput } from '../dtos/output/Planet';
import { PlanetService } from '../../../service/planet.service';
import { PlanetFactory } from '../../../planet.factory';
import { PlanetInput, PlanetInputPaginationDto, PlanetUpdateInput } from '../dtos/input/Planet';
import { IdOutput } from '../../../../../core/graphql/identity.dto';

@Resolver(() => PlanetOutput)
export class PlanetResolver {
  constructor(private readonly planetService: PlanetService) {}

  @Query(() => PlanetPagingOutput, { name: 'planets' })
  async getPaginated(@Args('pagination') pagination: PlanetInputPaginationDto) {
    return await this.planetService.findPaginated(pagination);
  }

  @Query(() => PlanetOutput, { name: 'planetById' })
  async getById(@Args('id') id: string): Promise<PlanetOutput> {
    return await this.planetService.findById(id);
  }

  /**Mutations */
  @Mutation(() => PlanetOutput, { name: 'createPlanet' })
  async create(@Args('input') input: PlanetInput): Promise<PlanetOutput> {
    const newPlanet = PlanetFactory.create(input);
    return await this.planetService.create(newPlanet);
  }

  @Mutation(() => PlanetOutput, { name: 'updatePlanet' })
  async update(@Args('input') input: PlanetUpdateInput): Promise<PlanetOutput> {
    const planet = PlanetFactory.create(input);
    return await this.planetService.update(input.id, planet);
  }

  @Mutation(() => IdOutput, { name: 'removePlanet' })
  async remove(@Args('id') id: string) {
    return await this.planetService.remove(id);
  }
}
