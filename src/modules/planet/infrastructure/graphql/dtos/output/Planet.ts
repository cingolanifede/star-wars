import { Field, ObjectType } from '@nestjs/graphql';
import { ICoords, IPlanet } from '../../../../interfaces/planet.interface';
import { PaginatedData, PagingMeta } from '../../../../../../core/interfaces';
import { Planet } from '../../../../entities/planet.entity';
import { PagingMetaResult } from '../../../../../../core/graphql/pagination.dto';

@ObjectType()
export class PlanetOutput implements IPlanet {
  @Field(() => String)
  id: string;
  @Field(() => String)
  name: string;
  @Field(() => Number, { nullable: true })
  population: number;
  @Field(() => String, { nullable: true })
  climate: string;
  @Field(() => String, { nullable: true })
  terrain: string;
  @Field(() => CoordinatesOutput, { nullable: true })
  coordinates: ICoords;
  @Field(() => String, { nullable: true })
  createdAt: Date;
  @Field(() => String, { nullable: true })
  updatedAt: Date;
}

@ObjectType()
export class CoordinatesOutput implements ICoords {
  @Field(() => Number)
  lat: number;
  @Field(() => Number)
  lon: number;
}

@ObjectType()
export class PlanetPagingOutput implements PaginatedData<Planet> {
  @Field(() => PagingMetaResult)
  pagingMeta: PagingMeta;
  @Field(() => [PlanetOutput])
  data: Planet[];
}
