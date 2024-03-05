import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from '@/core/config/configuration';
import { validationSchema } from '@/core/config/validation';
import { graphQLAsyncConfig } from '@/core/graphql/grapqhl.config';
import { mongoAsyncConfig } from '@/core/database/mongo/mongo.config';
import { DBConnectionService } from '@/core/abstracts/db-connection.service';
import { MongoConnectionService } from '@/core/database/mongo/mongo-connection.service';

import { AppService } from './app.service';
import { AppController } from './rest/app/app.controller';

import { PlanetModule } from './modules/planet/planet.module';
import { CharacterModule } from './modules/character/character.module';
import { StarshipModule } from './modules/starship/starship.module';
import { SeederModule } from './core/database/seeders/seeder.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisAsyncConfig } from './core/redis/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    GraphQLModule.forRootAsync(graphQLAsyncConfig),
    MongooseModule.forRootAsync(mongoAsyncConfig),
    CacheModule.registerAsync(redisAsyncConfig),
    SeederModule,
    PlanetModule,
    CharacterModule,
    StarshipModule,
  ],
  providers: [
    Logger,
    AppService,
    {
      provide: DBConnectionService,
      useClass: MongoConnectionService,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
