import { Injectable } from '@nestjs/common';
import { characters } from './character-seed';
import { CharacterService } from '../../../../modules/character/service/character.service';
import { CharacterFactory } from '../../../../modules/character/character.factory';
import { Planet } from '../../../../modules/planet/entities/planet.entity';

@Injectable()
export class CharacterSeedService {
  constructor(private readonly characterService: CharacterService) {}

  create(planets: Planet[]) {
    return characters(planets).map(async (character) => {
      const exists = await this.characterService.findOne({ name: character.name });
      if (exists) return;

      const newCharacter = CharacterFactory.create(character);

      return await this.characterService.create(newCharacter);
    });
  }
}
