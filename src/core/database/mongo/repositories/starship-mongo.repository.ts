import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MongoGenericRepository } from '../mongo-generic-repository';
import { Starship, StarshipDocument } from '../../../../modules/starship/entities/starship.entity';
import { StarshipRepository } from '../../../../modules/starship/starship.repository';

@Injectable()
export class StarshipMongoRepository extends MongoGenericRepository<Starship> implements StarshipRepository {
  private readonly logger = new Logger(StarshipMongoRepository.name);

  constructor(@InjectModel(Starship.name) protected model: Model<StarshipDocument>) {
    super(model);
  }
  async addEntity(id: string, shipId: string, entity: string): Promise<Starship> {
    return await this.model.findOneAndUpdate({ _id: shipId }, { $addToSet: { [entity]: id } }, { new: true });
  }
  async removeEntity(id: string, shipId: string, entity: string): Promise<Starship> {
    return await this.model.findOneAndUpdate({ _id: shipId }, { $pull: { [entity]: id } }, { new: true });
  }
}
