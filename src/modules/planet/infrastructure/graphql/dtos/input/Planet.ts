import { Field, InputType, Int } from '@nestjs/graphql';
import { ICoords } from '../../../../interfaces/planet.interface';

import { PaginationDto } from '../../../../../../core/dto/pagination.dto';
import { PagingInput } from '../../../../../../core/graphql/pagination.dto';

@InputType()
export class PlanetInput {
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => Int, { nullable: true })
  population: number;
  @Field(() => String, { nullable: true })
  climate: string;
  @Field(() => String, { nullable: true })
  terrain: string;
  @Field(() => CoordinatesInput, { nullable: true })
  coordinates: ICoords;
}

@InputType()
export class CoordinatesInput implements ICoords {
  @Field(() => Int)
  lat: number;
  @Field(() => Int)
  lon: number;
}

@InputType()
export class PlanetUpdateInput extends PlanetInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class PlanetQueryDto {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
}

@InputType()
export class PlanetInputPaginationDto {
  @Field(() => PagingInput, { nullable: true })
  paging?: PaginationDto;

  @Field(() => PlanetQueryDto, { nullable: true })
  args?: PlanetQueryDto;
}
