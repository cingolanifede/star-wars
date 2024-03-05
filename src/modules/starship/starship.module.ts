import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Starship, StarshipSchema } from './entities/starship.entity';
import { StarshipRepository } from './starship.repository';
import { StarshipService } from './service/starship.service';
import { StarshipResolver } from './infrastructure/graphql/resolvers/starship.resolver';
import { CharacterModule } from '../character/character.module';
import { StarshipMongoRepository } from '../../core/database/mongo/repositories';
import { PlanetModule } from '../planet/planet.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Starship.name,
        schema: StarshipSchema,
      },
    ]),
    CacheModule.register(),
    CharacterModule,
    PlanetModule,
  ],
  providers: [
    StarshipResolver,
    StarshipService,
    {
      provide: StarshipRepository,
      useClass: StarshipMongoRepository,
    },
  ],
  exports: [MongooseModule, StarshipService],
})
export class StarshipModule {}
