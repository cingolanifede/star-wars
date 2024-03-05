import { GenericRepository } from '../../core/abstracts/generic-repository';
import { Character } from './entities/character.entity';

export abstract class CharacterRepository extends GenericRepository<Character> {
  // abstract findByEmail(email: string): Promise<User>;
  // abstract removePaymentMethod(id: string, pmId: string): Promise<User>;
  // abstract findUsersByCategory(pagination: PaginationDto, filters: any): Promise<any>; //Promise<PaginatedData<T>>;
}
