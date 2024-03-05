import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

import { PaginationDto } from '../../../../../../core/dto/pagination.dto';
import { PagingInput } from '../../../../../../core/graphql/pagination.dto';
import { ICoords } from '../../../../../planet/interfaces/planet.interface';
import { CoordinatesInput } from '../../../../../planet/infrastructure/graphql/dtos/input/Planet';
import { StarshipEntity } from '../../../../enums/starshipEntity.enum';

@InputType()
export class StarshipInput {
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  model: string;
  @Field(() => Int, { nullable: true })
  capacity: number;
  @Field(() => CoordinatesInput, { nullable: true })
  location: ICoords;
  @Field(() => [String], { nullable: true })
  passengers?: string[];
  @Field(() => [String], { nullable: true })
  enemies?: string[];
}

@InputType()
export class StarshipUpdateInput extends StarshipInput {
  @Field(() => String)
  id: string;
}

//Declare enums!!
registerEnumType(StarshipEntity, {
  name: 'StarshipEntity',
  description: 'Starship Entity GraphQL',
  valuesMap: {
    PASSENGERS: {},
    ENEMIES: {},
  },
});

@InputType()
export class ToStarshipInput {
  @Field(() => String)
  shipId: string;
  @Field(() => String)
  id: string;
  @Field(() => StarshipEntity)
  entity: StarshipEntity; //passenger(character) or enemies(starship)
}

@InputType()
export class DistanceInput {
  @Field(() => String)
  planetDestination: string;
  @Field(() => CoordinatesInput)
  origin: ICoords;
}

@InputType()
export class EnemiesCheckInput {
  @Field(() => Int)
  range: number;
  @Field(() => String)
  whoami: string;
}

@InputType()
export class StarshipQueryDto {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
}

@InputType()
export class StarshipInputPaginationDto {
  @Field(() => PagingInput, { nullable: true })
  paging?: PaginationDto;

  @Field(() => StarshipQueryDto, { nullable: true })
  args?: StarshipQueryDto;
}
