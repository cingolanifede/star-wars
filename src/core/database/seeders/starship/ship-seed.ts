import { Character } from '../../../../modules/character/entities/character.entity';
import { Starship } from '../../../../modules/starship/entities/starship.entity';
import { StarshipFactory } from '../../../../modules/starship/starship.factory';

const mockedShips: Partial<Starship>[] = [
  {
    name: 'Star#1',
    model: 'M1',
    capacity: 10,
    currentLocation: {
      lat: 34.678,
      lon: 12.6789,
    },
  },
  {
    name: 'Star#2',
    model: 'M2',
    capacity: 60,
    currentLocation: {
      lat: 14.678,
      lon: 42.6789,
    },
  },
  {
    name: 'Star#3',
    model: 'M3',
    capacity: 4,
    currentLocation: {
      lat: 4.678,
      lon: 2.6789,
    },
  },
];

export const getSome = (array: Starship[], actual: Starship) => {
  const data = getRnd(array);

  if (data && data._id.toString() === actual._id.toString()) {
    getSome(array, actual);
  } else {
    return data;
  }
};

const getRnd = (array: Starship[] | Character[]) => {
  const rndIndex = Math.floor(Math.random() * array.length);
  return array[rndIndex];
};

export const ships = (characters: Character[]): Starship[] => {
  const data = mockedShips.map((ship) => {
    const { name, model, capacity, currentLocation } = ship;
    return StarshipFactory.create({
      name,
      model,
      capacity,
      currentLocation,
      passengers: [getRnd(characters)._id],
      enemies: [],
    });
  });
  console.log('data:', data);
  return data;
};
