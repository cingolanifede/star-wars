import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './service/character.service';
import { CacheModule } from '@nestjs/cache-manager';
import { PlanetModule } from '../planet/planet.module';
import { CharacterRepository } from './character.repository';
import { CharacterMongoRepository } from '../../core/database/mongo/repositories';
import { ConfigService } from '@nestjs/config';

const mockConfigService = () => ({
  get: jest.fn(),
});

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register(), PlanetModule],
      providers: [
        CharacterService,
        {
          provide: CharacterRepository,
          useClass: CharacterMongoRepository,
        },
        {
          provide: ConfigService,
          useFactory: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
