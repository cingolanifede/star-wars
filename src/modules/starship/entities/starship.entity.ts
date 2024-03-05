import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Entity } from '../../../core/database/mongo/entity.model';
import { Coords, CoordsSchema } from '../../planet/entities/planet.entity';
import { IStarship } from '../interfaces/starship.interface';
import { Character } from '../../character/entities/character.entity';

@Schema({ timestamps: true })
export class Starship extends Entity implements IStarship {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  model: string;

  @Prop({ type: Number })
  capacity: number;

  @Prop({ type: CoordsSchema })
  currentLocation: Coords;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Character.name }] })
  passengers: Types.ObjectId[] | Character[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Starship.name }] })
  enemies: Types.ObjectId[] | Starship[];
}

export const StarshipSchema = SchemaFactory.createForClass(Starship);
export type StarshipDocument = Starship & Document;

StarshipSchema.index({ name: 'text' });
