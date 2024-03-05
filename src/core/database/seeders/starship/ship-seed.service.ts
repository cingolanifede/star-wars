import { Injectable } from '@nestjs/common';
import { StarshipService } from '../../../../modules/starship/service/starship.service';
import { StarshipFactory } from '../../../../modules/starship/starship.factory';
import { Character } from '../../../../modules/character/entities/character.entity';
import { ships } from './ship-seed';
import { Starship } from '../../../../modules/starship/entities/starship.entity';

@Injectable()
export class StarshipSeedService {
  constructor(private readonly starshipService: StarshipService) {}

  create(characters: Character[]) {
    return ships(characters).map(async (ship) => {
      const exists = await this.starshipService.findOne({ name: ship.name });
      if (exists) return;

      const newShip = StarshipFactory.create(ship);

      return await this.starshipService.create(newShip);
    });
  }

  update(ships: Starship[]) {
    return ships.map(async (ship, index, array) => {
      const ix = Math.floor(Math.random() * array.length);
      const updated = StarshipFactory.create({ enemies: [array[ix]._id] });

      await this.starshipService.update(ship._id, updated);

      const newShip = StarshipFactory.create(ship);

      return await this.starshipService.create(newShip);
    });
  }
}
