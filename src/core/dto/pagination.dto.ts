import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationOrderDir } from '../enums/pagination';
import { IPaginationDto } from '../interfaces';

export class PaginationDto implements IPaginationDto {
  // Size of page
  @IsNumber()
  @IsOptional()
  limit?: number;

  // Number to skip.  PageNumber x PageSize
  @IsNumber()
  @IsOptional()
  skip?: number;

  // String path to apply ordering. Example: name or user.name or user.books.name
  @IsString()
  @IsOptional()
  orderBy?: string;

  // String to indicate sorting direction
  @IsString()
  @IsEnum(PaginationOrderDir)
  @IsOptional()
  orderByDir?: PaginationOrderDir;

  // A search string to search in all fields.  This is not implemented yet
  @IsString()
  @IsOptional()
  search?: string;
}
