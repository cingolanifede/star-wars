import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { RestConfig } from './rest/rest-config';
import { AppConfiguration } from './core/config/configuration.interface';
import { DBConnectionService } from './core/abstracts/db-connection.service';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(
    private configService: ConfigService,
    private dbConnection: DBConnectionService,
  ) {
    this.init();
  }

  get appConfigs() {
    return this.configService.get<AppConfiguration>('app');
  }

  getHealthCheck() {
    const response = {
      appVersion: this.appConfigs.version,
      app: `${this.appConfigs.name}`,
    };
    if (this.dbConnection.isConnected()) {
      return { ...response, status: 'OK' };
    } else {
      throw new InternalServerErrorException({
        ...response,
        db: { status: 'down' },
      });
    }
  }

  getVersion(req: Request) {
    const currentTime = new Date().toISOString();
    const apiDocsUrl = `${req.hostname}/${RestConfig.filesRoute}/${RestConfig.uploadFilesRoute}`;
    return {
      appName: this.appConfigs.name,
      appVersion: this.appConfigs.version,
      apiDocsUrl,
      currentTime,
    };
  }

  exitApp(withError = false) {
    const exitCode = withError ? -1 : 0;
    process.exit(exitCode);
  }

  private init() {
    this.dbConnection.onConnected(() => {
      this.logger.log({
        message: 'MongoDB connection: Success!',
        operation: 'onConnected',
      });
    });

    this.dbConnection.onError((error) => {
      this.logger.error({
        message: `MongoDB connection error: ${error}`,
        operation: `onError`,
      });
      this.exitApp(true);
    });
  }
}
