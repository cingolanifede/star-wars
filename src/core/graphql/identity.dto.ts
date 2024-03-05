import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IdOutput {
  @Field(() => String)
  id: string;
}
