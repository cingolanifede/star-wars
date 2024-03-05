import { Test, TestingModule } from '@nestjs/testing';
import { StarshipSeedService } from './ship-seed.service';

describe('StarshipSeedService', () => {
  let service: StarshipSeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarshipSeedService],
    }).compile();

    service = module.get<StarshipSeedService>(StarshipSeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
