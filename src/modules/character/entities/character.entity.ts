import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Entity } from '../../../core/database/mongo/entity.model';
import { ICharacter } from '../interfaces/character.interface';
import { Planet } from '../../planet/entities/planet.entity';

@Schema({ timestamps: true })
export class Character extends Entity implements ICharacter {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  species: string;

  @Prop({ type: Number })
  sensitivity: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: Planet.name })
  location: Types.ObjectId | Planet;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
export type CharacterDocument = Character & Document;

CharacterSchema.index({ name: 'text' });
