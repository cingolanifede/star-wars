import { Module } from '@nestjs/common';
import { StarshipModule } from '../../../../modules/starship/starship.module';
import { StarshipSeedService } from './ship-seed.service';

@Module({
  imports: [StarshipModule],
  providers: [StarshipSeedService],
  exports: [StarshipSeedService, StarshipModule],
})
export class StarshipSeedModule {}
