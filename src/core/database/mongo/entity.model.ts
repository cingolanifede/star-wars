import { InterfaceType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IEntity } from '../../interfaces';

@ObjectType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export abstract class Entity implements IEntity {
  _id: string;
  id: string;
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
