import { Test, TestingModule } from '@nestjs/testing';
import { PlanetSeedService } from './planet-seed.service';

describe('PlanetSeedService', () => {
  let service: PlanetSeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanetSeedService],
    }).compile();

    service = module.get<PlanetSeedService>(PlanetSeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
