import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AppConfiguration } from './core/config/configuration.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfiguration>('app');

  const logger = new Logger(`${appConfig.name} - Main`);

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: appConfig.isProduction,
    }),
  );

  await app.listen(appConfig.port);
  logger.log(
    `${appConfig.name} started on ${appConfig.hostName}:${appConfig.port}`,
  );
}
bootstrap();
