import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Planet, PlanetDocument } from '../../../../modules/planet/entities/planet.entity';
import { MongoGenericRepository } from '../mongo-generic-repository';
import { PlanetRepository } from '../../../../modules/planet/planet.repository';

@Injectable()
export class PlanetMongoRepository extends MongoGenericRepository<Planet> implements PlanetRepository {
  private readonly logger = new Logger(PlanetMongoRepository.name);

  constructor(@InjectModel(Planet.name) protected model: Model<PlanetDocument>) {
    super(model);
  }
}
