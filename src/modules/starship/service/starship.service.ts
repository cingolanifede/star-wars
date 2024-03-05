import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { GenericEntityService } from '../../../core/abstracts/generic-entity.service';
import { Starship } from '../entities/starship.entity';
import { StarshipRepository } from '../starship.repository';
import {
  DistanceInput,
  EnemiesCheckInput,
  StarshipInputPaginationDto,
  ToStarshipInput,
} from '../infrastructure/graphql/dtos/input/starship.input';
import { CharacterService } from '../../character/service/character.service';
import { StarshipEntity } from '../enums/starshipEntity.enum';
import { PlanetService } from '../../planet/service/planet.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class StarshipService extends GenericEntityService<Starship> {
  protected logger: Logger;

  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    protected readonly repository: StarshipRepository,
    private readonly characterService: CharacterService,
    private readonly planetService: PlanetService,
  ) {
    super(repository, Starship.name);
    this.logger = new Logger(`GenericService ${this.name}`);
  }

  async create(starship: Starship) {
    this.logger.log({ message: 'create', starship });
    return await this.repository.create(starship);
  }

  async findPaginated(pagination: StarshipInputPaginationDto) {
    const { paging } = pagination;
    return await super.findAllPaginated(
      paging,
      pagination?.args ? pagination?.args : null,
    );
  }

  async findById(id: string): Promise<Starship> {
    const cachedData = await this.cacheService.get<Starship>(id);
    if (cachedData) return cachedData;

    const starship = await this.repository.findOne({ _id: id });
    await this.cacheService.set(id, starship);
    return starship;
  }

  async addToStarship(input: ToStarshipInput) {
    const ship = await this.repository.getById(input.shipId);
    if (!ship) throw new NotFoundException('Starship not found');

    //Check if entity exists
    const { entity } = await this.validateEntities(input);

    return this.repository.addEntity(input.id, input.shipId, entity);
  }

  async removeToStarship(input: ToStarshipInput) {
    const ship = await this.repository.getById(input.shipId);
    if (!ship) throw new NotFoundException('Starship not found');

    //Check if entity exists
    const { entity } = await this.validateEntities(input);

    return this.repository.removeEntity(input.id, input.shipId, entity);
  }

  async getDistance(input: DistanceInput): Promise<{ distance: number }> {
    const destPlanet = await this.planetService.findById(
      input.planetDestination,
    );
    if (!destPlanet) throw new NotFoundException('Planet not found');
    const { coordinates } = destPlanet;
    const { origin } = input;

    const distance = this.calculateDistanceInKm(
      origin.lat,
      origin.lon,
      coordinates.lat,
      coordinates.lon,
    );
    return { distance };
  }

  async getEnemies(input: EnemiesCheckInput): Promise<Starship[]> {
    const { whoami, range } = input;

    //could be something different, like filtering by galaxy or some area to avoid query all ships
    const ships = await this.repository.getAll();
    const myShip = ships.find(
      (ship: Starship) => ship._id.toString() === whoami.toString(),
    );
    if (!myShip) throw new NotFoundException('Ship foes not exist');

    const result = [];
    await Promise.all(
      ships.map((ship: Starship) => {
        try {
          const distance = this.calculateDistanceInKm(
            myShip.currentLocation.lat,
            myShip.currentLocation.lon,
            ship.currentLocation.lat,
            ship.currentLocation.lon,
          );
          if (distance <= range) result.push(ship);
        } catch (error) {
          this.logger.error(error);
        }
      }),
    );
    return result;
  }
  /**
   *
   * @param input
   * @returns StarshipEntity (PASSENGERS,ENEMIES)
   */
  private async validateEntities(
    input: ToStarshipInput,
  ): Promise<{ entity: StarshipEntity }> {
    let entity = StarshipEntity.ENEMIES;

    if (input.entity === StarshipEntity.PASSENGERS) {
      const passenger = await this.characterService.findById(input.shipId);
      if (!passenger) throw new NotFoundException('Passenger not found');
      entity = StarshipEntity.PASSENGERS;
    }
    if (input.entity === StarshipEntity.ENEMIES) {
      const enemy = await this.repository.getById(input.id);
      if (!enemy) throw new NotFoundException('Enemy starship not found');
    }
    return { entity };
  }

  private calculateDistanceInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    R = 6371,
  ): number {
    const deg2rad = (deg) => deg * (Math.PI / 180);
    // const R = 6371; // Radius of the earth in km

    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(2)); // Distance in km
  }
}
