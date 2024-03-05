import { Planet } from '../../../../modules/planet/entities/planet.entity';

export const planets: Partial<Planet>[] = [
  {
    name: 'p1',
    population: 9993239,
    climate: 'Dry',
    terrain: 'Solid',
    coordinates: {
      lon: 12.56,
      lat: 57.34,
    },
  },
  {
    name: 'p2',
    population: 123456,
    climate: 'Wet',
    terrain: 'Sand',
    coordinates: {
      lon: 47.23,
      lat: 79.12,
    },
  },
  {
    name: 'p3',
    population: 500,
    climate: 'Hot',
    terrain: 'Sand',
    coordinates: {
      lon: 28.234,
      lat: 56.728,
    },
  },
];
