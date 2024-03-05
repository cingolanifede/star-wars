import { GenericRepository } from '../../core/abstracts/generic-repository';
import { Starship } from './entities/starship.entity';

export abstract class StarshipRepository extends GenericRepository<Starship> {
  abstract addEntity(id: string, shipId: string, entity: string): Promise<Starship>;
  abstract removeEntity(id: string, shipId: string, entity: string): Promise<Starship>;
}
