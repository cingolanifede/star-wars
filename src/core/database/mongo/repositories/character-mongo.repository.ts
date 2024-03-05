import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MongoGenericRepository } from '../mongo-generic-repository';
import { Character, CharacterDocument } from '../../../../modules/character/entities/character.entity';
import { CharacterRepository } from '../../../../modules/character/character.repository';

@Injectable()
export class CharacterMongoRepository extends MongoGenericRepository<Character> implements CharacterRepository {
  private readonly logger = new Logger(CharacterMongoRepository.name);

  constructor(@InjectModel(Character.name) protected model: Model<CharacterDocument>) {
    super(model);
  }
}
