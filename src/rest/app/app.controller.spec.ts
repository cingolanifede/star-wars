import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../../app.service';
import { ConfigService } from '@nestjs/config';
import { DBConnectionService } from '../../core/abstracts/db-connection.service';
import { DBConnectionMockService } from './mockedService';
import { Request } from 'express';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockedReq = {
  hostname: 'localhost',
} as Request;

const mockHealth = {
  appVersion: '1.0.0',
  app: 'Star Wars API',
  status: 'OK',
};

const mockVersion = {
  appVersion: '1.0.0',
  app: 'Star Wars API',
  apiDocsUrl: `${mockedReq.hostname}/somePath`,
  currentTime: new Date().toISOString(),
};
const mockAppService = {
  getHealthCheck: jest.fn().mockReturnValue(mockHealth),
  getVersion: jest.fn().mockReturnValue(mockVersion),
};

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useFactory: mockConfigService,
        },
        {
          provide: AppService,
          useValue: mockAppService,
        },
        //For testing purpose, need to mock the DB connection Service
        {
          provide: DBConnectionService,
          useClass: DBConnectionMockService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return health data & have been called', () => {
    const result = appController.healthCheck();
    expect(appService.getHealthCheck).toHaveBeenCalled();
    expect(result).toEqual(mockHealth);
  });

  it('should return version data & have been called', () => {
    const result = appController.version(mockedReq);
    expect(appService.getVersion).toHaveBeenCalled();
    expect(result).toEqual(mockVersion);
  });
});
