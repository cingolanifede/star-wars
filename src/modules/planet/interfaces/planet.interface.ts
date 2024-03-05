import { Types } from 'mongoose';
import { IEntity } from '../../../core/interfaces';
import { Coords } from '../entities/planet.entity';

export interface IPlanet extends IEntity {
  name: string;
  population: number;
  climate: string;
  terrain: string;
  coordinates: Types.ObjectId | Coords;
}

export interface ICoords {
  lat: number;
  lon: number;
}
