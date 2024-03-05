import { Character } from './entities/character.entity';

export class CharacterFactory {
  static create(data: Partial<Character> | any) {
    const planet = new Character();
    planet.name = data.name;
    planet.species = data.species;
    planet.sensitivity = data.sensitivity;
    planet.location = data.location;

    // delete unset properties
    Object.keys(planet).forEach((key) => planet[key] === undefined && delete planet[key]);
    return planet;
  }
}
