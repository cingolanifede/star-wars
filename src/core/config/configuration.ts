import {
  AppConfiguration,
  AppEnvironment,
  MongoConfiguration,
  RedisConfiguration,
} from './configuration.interface';

export default () => {
  const app: AppConfiguration = {
    env: process.env.NODE_ENV as AppEnvironment,
    port: parseInt(process.env.APP_PORT),
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    hostName: process.env.APP_HOST_NAME,
    jwtSecret: process.env.JWT_SECRET,
    jwtBearerExpiration: process.env.JWT_BEARER_EXPIRATION,
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
    corsHeaders: process.env.CORS_HEADERS.split(' '),
    corsMethods: process.env.CORS_METHODS.split(' '),
    isProduction: process.env.NODE_ENV === AppEnvironment.Production,
  };

  const mongo: MongoConfiguration = {
    name: process.env.MONGO_DB_NAME,
    host: process.env.MONGO_DB_HOST,
    port: parseInt(process.env.MONGO_DB_PORT),
    user: process.env.MONGO_DB_USER,
    password: process.env.MONGO_DB_PASSWORD,
    uri: process.env.MONGO_DB_CONNECTION_STRING_URL,
    connectionTimeout: parseInt(process.env.MONGO_DB_CONNECTION_TIME_OUT),
    acquireTimeout: parseInt(process.env.MONGO_DB_ACQUIRE_TIME_OUT),
    connectionLimit: parseInt(process.env.MONGO_DB_CONNECTION_LIMIT),
  };
  const redis: RedisConfiguration = {
    host: process.env.REDIS_DB_HOST,
    port: parseInt(process.env.REDIS_DB_PORT),
    ttl: parseInt(process.env.REDIS_DB_TTL),
  };

  return { app, mongo, redis };
};
