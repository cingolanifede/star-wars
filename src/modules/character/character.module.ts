import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Character, CharacterSchema } from './entities/character.entity';
import { PlanetModule } from '../planet/planet.module';
import { CharacterRepository } from './character.repository';
import { CharacterService } from './service/character.service';
import { CharacterResolver } from './infrastructure/graphql/resolvers/character.resolver';
import { CharacterMongoRepository } from '../../core/database/mongo/repositories';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Character.name,
        schema: CharacterSchema,
      },
    ]),
    CacheModule.register(),
    PlanetModule,
  ],
  providers: [
    CharacterResolver,
    CharacterService,
    {
      provide: CharacterRepository,
      useClass: CharacterMongoRepository,
    },
  ],
  exports: [MongooseModule, CharacterService],
})
export class CharacterModule {}
