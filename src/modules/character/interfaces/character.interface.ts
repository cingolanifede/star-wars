import { Types } from 'mongoose';
import { IEntity } from '../../../core/interfaces';
import { Planet } from '../../planet/entities/planet.entity';

export interface ICharacter extends IEntity {
  name: string;
  species: string;
  sensitivity: number;
  location: Types.ObjectId | Planet;
}
