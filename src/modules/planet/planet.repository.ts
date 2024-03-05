import { GenericRepository } from '../../core/abstracts/generic-repository';
import { Planet } from './entities/planet.entity';

export abstract class PlanetRepository extends GenericRepository<Planet> {}
