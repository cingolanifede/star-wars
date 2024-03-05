import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppConfiguration, MongoConfiguration } from '../../config/configuration.interface';
import { Logger } from '@nestjs/common';

export default class MongooseConfig {
  private static logger = new Logger(MongooseConfig.name);

  static getMongooseConfig(config: ConfigService): MongooseModuleOptions {
    const appConfig = config.get<AppConfiguration>('app');
    const mongoConfig = config.get<MongoConfiguration>('mongo');

    const options: MongooseModuleOptions = {
      uri: mongoConfig.uri,
      dbName: mongoConfig.name,
      appName: appConfig.name,
      connectTimeoutMS: mongoConfig.connectionTimeout,
      connectionFactory: (connection) => {
        if (connection.readyState === 1) {
          this.logger.log(`MongoDB connection is ready`);
        }

        connection.on('disconnected', () => {
          this.logger.log(`MongoDB connection is disconnected`);
        });
        return connection;
      },
    };

    if (!options.uri) {
      options.uri = `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.name}`;
      options.dbName = mongoConfig.name;
    }

    let auth = null;
    if (mongoConfig.user) {
      auth = {
        user: mongoConfig.user,
        password: mongoConfig.password,
      };
    }

    if (auth) {
      options.auth = auth;
    }
    return options;
  }
}

export const mongoAsyncConfig: MongooseModuleAsyncOptions = {
  useFactory: async (config: ConfigService) => MongooseConfig.getMongooseConfig(config),
  inject: [ConfigService],
};
