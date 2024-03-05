import { Module } from '@nestjs/common';
import { CharacterModule } from '../../../../modules/character/character.module';
import { CharacterSeedService } from './character-seed.service';

@Module({
  imports: [CharacterModule],
  providers: [CharacterSeedService],
  exports: [CharacterSeedService, CharacterModule],
})
export class CharacterSeedModule {}
