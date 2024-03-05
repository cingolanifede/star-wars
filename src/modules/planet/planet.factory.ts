import { Coords, Planet } from './entities/planet.entity';

export class PlanetFactory {
  static create(data: Partial<Planet> | any) {
    const planet = new Planet();
    planet.name = data?.name;
    planet.population = data?.population;
    planet.climate = data?.climate;
    planet.terrain = data?.terrain;
    planet.coordinates = CoordinatesFactory.create({
      lat: data?.coordinates?.lat,
      lon: data?.coordinates?.lon,
    });

    Object.keys(planet).forEach(
      (key) => planet[key] === undefined && delete planet[key],
    );
    return planet;
  }
}

export class CoordinatesFactory {
  static create(data: Partial<Coords> | any) {
    const coordinates = new Coords();
    coordinates.lat = data?.lat;
    coordinates.lon = data?.lon;

    Object.keys(coordinates).forEach(
      (key) => coordinates[key] === undefined && delete coordinates[key],
    );
    return coordinates;
  }
}
