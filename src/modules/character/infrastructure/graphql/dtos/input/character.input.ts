import { Field, InputType, Int } from '@nestjs/graphql';

import { PaginationDto } from '../../../../../../core/dto/pagination.dto';
import { PagingInput } from '../../../../../../core/graphql/pagination.dto';

@InputType()
export class CharacterInput {
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  species: string;
  @Field(() => Int, { nullable: true })
  sensitivity: number;
  @Field(() => String, { nullable: true })
  location: string;
}

@InputType()
export class CharacterUpdateInput extends CharacterInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class CharacterQueryDto {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
}

@InputType()
export class CharacterInputPaginationDto {
  @Field(() => PagingInput, { nullable: true })
  paging?: PaginationDto;

  @Field(() => CharacterQueryDto, { nullable: true })
  args?: CharacterQueryDto;
}
