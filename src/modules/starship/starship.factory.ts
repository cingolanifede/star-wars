import { Starship } from './entities/starship.entity';

export class StarshipFactory {
  static create(data: Partial<Starship> | any) {
    const starship = new Starship();
    starship.name = data.name;
    starship.model = data.model;
    starship.capacity = data.capacity;
    starship.currentLocation = data.currentLocation;
    starship.passengers = data.passengers;
    starship.enemies = data.enemies;

    // delete unset properties
    Object.keys(starship).forEach((key) => starship[key] === undefined && delete starship[key]);
    return starship;
  }
}
