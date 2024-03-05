import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PaginationOrderDir } from '../enums/pagination';
import { PaginationDto } from '../dto/pagination.dto';

//Declare enums!!
registerEnumType(PaginationOrderDir, {
  name: 'PaginationOrderDir',
  description: 'Pagination GraphQL',
  valuesMap: {
    ASC: {},
    DESC: {},
  },
});

@InputType()
export class PagingInput implements PaginationDto {
  @Field(() => Number)
  limit: number;

  @Field(() => Number)
  skip: number;

  @Field(() => String, {
    nullable: true,
    description: 'String path to apply ordering. Example: name or user.name or user.books.name',
  })
  orderBy: string;

  @Field(() => PaginationOrderDir, { nullable: true })
  orderByDir: PaginationOrderDir;

  @Field(() => String, { nullable: true })
  search: string;
}

@ObjectType()
export class PagingMetaResult {
  @Field(() => Number)
  count: number;
  @Field(() => Number)
  startIndex: number;
  @Field(() => Number, { nullable: true })
  endIndex: number;
  @Field(() => Boolean)
  hasNextPage: boolean;
}
