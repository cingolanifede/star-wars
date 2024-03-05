import { Test, TestingModule } from '@nestjs/testing';
import { CharacterSeedService } from './character-seed.service';

describe('CharacterSeedService', () => {
  let service: CharacterSeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterSeedService],
    }).compile();

    service = module.get<CharacterSeedService>(CharacterSeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
