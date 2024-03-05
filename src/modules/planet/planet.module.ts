import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Planet, PlanetSchema } from './entities/planet.entity';
import { PlanetRepository } from './planet.repository';
import { PlanetMongoRepository } from '../../core/database/mongo/repositories/planet-mongo.repository';
import { PlanetService } from './service/planet.service';
import { PlanetResolver } from './infrastructure/graphql/resolvers/planet.resolver';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Planet.name,
        schema: PlanetSchema,
      },
    ]),
    CacheModule.register(),
  ],
  providers: [
    PlanetService,
    PlanetResolver,
    {
      provide: PlanetRepository,
      useClass: PlanetMongoRepository,
    },
  ],
  exports: [MongooseModule, PlanetService],
})
export class PlanetModule {}
