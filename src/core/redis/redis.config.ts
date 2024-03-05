import { ConfigService } from '@nestjs/config';
import { RedisConfiguration } from '../config/configuration.interface';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModuleOptions } from '@nestjs/cache-manager';

export default class RedisConfig {
  static getRedisConfig(config: ConfigService): CacheModuleOptions {
    const redisConfig = config.get<RedisConfiguration>('redis');
    return {
      isGlobal: true,
      store: redisStore,
      host: redisConfig.host,
      port: redisConfig.port,
      ttl: redisConfig.ttl,
    };
  }
}

export const redisAsyncConfig = {
  useFactory: async (config: ConfigService) =>
    RedisConfig.getRedisConfig(config),
  inject: [ConfigService],
};
