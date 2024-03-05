import { ConfigService } from '@nestjs/config';
import { join } from 'path';
// import { AppConfiguration } from '../config/configuration.interface';
import {
  ApolloDriver,
  ApolloDriverAsyncConfig,
  ApolloDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export default class GraphQLConfig {
  static getGraphQLConfig(config: ConfigService): ApolloDriverConfig {
    // const appConfig = config.get<AppConfiguration>('app');
    return {
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      cache: 'bounded',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({ req }),
      formatError: (err: any) => ({
        message: err.message,
        status: err.extensions.code,
        extensions: err.extensions?.originalError || err.extensions,
      }),
    };
  }
}

export const graphQLAsyncConfig: ApolloDriverAsyncConfig = {
  useFactory: async (config: ConfigService) =>
    GraphQLConfig.getGraphQLConfig(config),
  inject: [ConfigService],
  driver: ApolloDriver,
};
