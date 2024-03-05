import { Module } from '@nestjs/common';
import { PlanetModule } from '../../../../modules/planet/planet.module';
import { PlanetSeedService } from './planet-seed.service';

@Module({
  imports: [PlanetModule],
  providers: [PlanetSeedService],
  exports: [PlanetSeedService, PlanetModule],
})
export class PlanetSeedModule {}
