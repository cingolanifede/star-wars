import { Injectable, Logger } from '@nestjs/common';
import { PlanetSeedService } from './planet/planet-seed.service';
import { Planet } from '../../../modules/planet/entities/planet.entity';
import { Character } from '../../../modules/character/entities/character.entity';
import { CharacterSeedService } from './character/character-seed.service';
import { StarshipSeedService } from './starship/ship-seed.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly planetSeeder: PlanetSeedService,
    private readonly characterSeeder: CharacterSeedService,
    private readonly shipSeeder: StarshipSeedService,
  ) {}

  async seed() {
    try {
      this.logger.log('Running seed...');
      const planets = await this.planets();
      const characters = await this.characters(planets);
      await this.ships(characters);
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async ships(characters: Character[]) {
    try {
      this.logger.log('Seeding ships...');
      const ships = await Promise.all(this.shipSeeder.create(characters));
      await Promise.all(this.shipSeeder.update(ships));
      this.logger.log(`${ships.length} ships created`);
      return ships;
    } catch (error) {
      this.logger.error('Error while seeding ships', error);
    }
  }

  private async characters(planets: Planet[]) {
    try {
      this.logger.log('Seeding characters...');
      const characters = await Promise.all(
        this.characterSeeder.create(planets),
      );
      this.logger.log(`${characters.length} characters created`);
      return characters;
    } catch (error) {
      this.logger.error('Error while seeding characters', error);
    }
  }

  private async planets() {
    try {
      this.logger.log('Seeding planets...');
      const planets = await Promise.all(this.planetSeeder.create());
      this.logger.log(`${planets.length} planets created`);
      return planets;
    } catch (error) {
      this.logger.error('Error while seeding planets', error);
    }
  }
}
