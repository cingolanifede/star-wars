import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Entity } from '../../../core/database/mongo/entity.model';
import { IPlanet } from '../interfaces/planet.interface';

@Schema({ _id: false, timestamps: false })
export class Coords {
  @Prop({ type: Number, required: false })
  lat: number;

  @Prop({ type: Number, required: false })
  lon: number;
}
export const CoordsSchema = SchemaFactory.createForClass(Coords);

@Schema({ timestamps: true })
export class Planet extends Entity implements IPlanet {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  population: number;

  @Prop({ type: String })
  climate: string;

  @Prop({ type: String })
  terrain: string;

  @Prop({ type: CoordsSchema })
  coordinates: Coords;
}

export const PlanetSchema = SchemaFactory.createForClass(Planet);
export type PlanetDocument = Planet & Document;

PlanetSchema.index({ name: 'text' });
