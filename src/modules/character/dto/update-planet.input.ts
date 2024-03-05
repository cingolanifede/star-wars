import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryInput } from './create-planet.input';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
