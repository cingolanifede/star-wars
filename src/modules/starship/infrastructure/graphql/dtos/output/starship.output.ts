import { Field, ObjectType } from '@nestjs/graphql';
import { PaginatedData, PagingMeta } from '../../../../../../core/interfaces';
import { PagingMetaResult } from '../../../../../../core/graphql/pagination.dto';
import { CoordinatesOutput } from '../../../../../planet/infrastructure/graphql/dtos/output/Planet';
import { IStarship } from '../../../../interfaces/starship.interface';
import { CharacterOutput } from '../../../../../character/infrastructure/graphql/dtos/output/character.output';
import { ICoords } from '../../../../../planet/interfaces/planet.interface';
import { Starship } from '../../../../entities/starship.entity';

@ObjectType()
export class StarshipOutput implements IStarship {
  @Field(() => String)
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  model: string;
  @Field(() => Number, { nullable: true })
  capacity: number;
  @Field(() => CoordinatesOutput, { nullable: true })
  currentLocation: ICoords;

  @Field(() => [StarshipOutput, { nullable: true }], { nullable: true })
  enemies: any[];
  @Field(() => [CharacterOutput, { nullable: true }], { nullable: true })
  passengers: any[];

  @Field(() => String, { nullable: true })
  createdAt: Date;
  @Field(() => String, { nullable: true })
  updatedAt: Date;
}

@ObjectType()
export class DistanceOutput {
  @Field(() => Number)
  distance: number;
}

@ObjectType()
export class StarshipPagingOutput implements PaginatedData<Starship> {
  @Field(() => PagingMetaResult)
  pagingMeta: PagingMeta;
  @Field(() => [StarshipOutput])
  data: Starship[];
}
