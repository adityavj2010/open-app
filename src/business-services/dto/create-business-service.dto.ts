import { Column } from 'typeorm';
import { Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBusinessServiceDto {
  @ApiPropertyOptional()
  bId?: number;

  @ApiProperty()
  serviceName: string;

  @ApiProperty()
  time: number;

  @ApiProperty()
  cost: number;

  @ApiPropertyOptional()
  desc?: string;

  @ApiPropertyOptional()
  picture?: string;

  @ApiPropertyOptional()
  extraData?: string;
}
