import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ICharacter } from '../../../../interfaces/character.interface';
import { PaginatedData, PagingMeta } from '../../../../../../core/interfaces';
import { PagingMetaResult } from '../../../../../../core/graphql/pagination.dto';
import { Character } from '../../../../entities/character.entity';
import { PlanetOutput } from '../../../../../planet/infrastructure/graphql/dtos/output/Planet';
import { Planet } from '../../../../../planet/entities/planet.entity';

@ObjectType()
export class CharacterOutput implements ICharacter {
  @Field(() => String)
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  species: string;
  @Field(() => Int, { nullable: true })
  sensitivity: number;
  @Field(() => PlanetOutput, { nullable: true })
  location: Planet | any;
  @Field(() => String, { nullable: true })
  createdAt: Date;
  @Field(() => String, { nullable: true })
  updatedAt: Date;
}

@ObjectType()
export class CharacterPagingOutput implements PaginatedData<Character> {
  @Field(() => PagingMetaResult)
  pagingMeta: PagingMeta;
  @Field(() => [CharacterOutput])
  data: Character[];
}
