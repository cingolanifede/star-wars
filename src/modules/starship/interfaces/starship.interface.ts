import { Types } from 'mongoose';
import { IEntity } from '../../../core/interfaces';
import { Character } from '../../character/entities/character.entity';
import { Starship } from '../entities/starship.entity';
import { ICoords } from '../../planet/interfaces/planet.interface';

export interface IStarship extends IEntity {
  name: string;
  model: string;
  capacity: number;
  currentLocation: ICoords;
  passengers: Types.ObjectId[] | Character[];
  enemies: Types.ObjectId[] | Starship[];
}
