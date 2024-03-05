import { Injectable } from '@nestjs/common';
import { PlanetService } from '../../../../modules/planet/service/planet.service';

import { Planet } from '../../../../modules/planet/entities/planet.entity';
import { planets } from './planet-seed';
import { PlanetFactory } from '../../../../modules/planet/planet.factory';

@Injectable()
export class PlanetSeedService {
  constructor(private readonly planetService: PlanetService) {}

  create() {
    return planets.map(async (planet: Planet) => {
      try {
        const exists = await this.planetService.findOne({ name: planet.name });
        if (exists) return;

        const newPlanet = PlanetFactory.create(planet);
        return await this.planetService.create(newPlanet);
      } catch (error) {
        console.log('error:', error);
      }
    });
  }
}
