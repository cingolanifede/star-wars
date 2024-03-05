export enum AppEnvironment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Local = 'local',
}

export interface AppConfiguration {
  env: AppEnvironment;
  port: number;
  name: string;
  version: string;
  hostName: string;
  jwtSecret: string;
  jwtBearerExpiration: string;
  jwtRefreshExpiration: string;
  corsHeaders: string[];
  corsMethods: string[];
  isProduction: boolean;
}

export interface MongoConfiguration {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
  uri: string;
  connectionTimeout: number;
  acquireTimeout: number;
  connectionLimit: number;
}

export interface RedisConfiguration {
  host: string;
  port: number;
  ttl: number;
}
