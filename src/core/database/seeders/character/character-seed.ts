import { Planet } from '../../../../modules/planet/entities/planet.entity';
import { Character } from '../../../../modules/character/entities/character.entity';
import { CharacterFactory } from '../../../../modules/character/character.factory';

const mockedCharacters: Partial<Character>[] = [
  {
    name: 'Han Solo',
    species: 'Human',
    sensitivity: 8,
  },
  {
    name: 'Luke Skywalker',
    species: 'Jedi',
    sensitivity: 10,
  },
  {
    name: 'Chewbacca',
    species: 'Wookiee',
    sensitivity: 0,
  },
];

const getRnd = (array: Planet[]) => {
  const rndIndex = Math.floor(Math.random() * array.length);
  return array[rndIndex];
};

export const characters = (planets: Planet[]): Character[] => {
  return mockedCharacters.map((character) => {
    const { name, species, sensitivity } = character;
    return CharacterFactory.create({ name, species, sensitivity, location: getRnd(planets) });
  });
};
