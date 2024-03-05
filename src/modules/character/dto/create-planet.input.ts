import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryInput {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly disabled: boolean;

  @IsString()
  @IsOptional()
  readonly coverMedia?: string;
}
