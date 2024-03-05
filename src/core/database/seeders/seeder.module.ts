import { ConfigModule } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { mongoAsyncConfig } from '../mongo/mongo.config';
import { validationSchema } from '../../config/validation';
import configuration from '../../config/configuration';
import { Seeder } from './seeder';
import { PlanetSeedModule } from './planet/planet-seed.module';
import { StarshipSeedModule } from './starship/ship-seed.module';
import { CharacterSeedModule } from './character/character-seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    MongooseModule.forRootAsync(mongoAsyncConfig),
    PlanetSeedModule,
    StarshipSeedModule,
    CharacterSeedModule,
  ],
  providers: [Seeder, Logger],
})
export class SeederModule {}
