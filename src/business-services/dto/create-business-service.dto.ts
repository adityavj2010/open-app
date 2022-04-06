import { Column } from 'typeorm';
import { Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBusinessServiceDto {
  @ApiProperty()
  bId: number;

  @ApiProperty()
  serviceName: string;

  @ApiProperty()
  time: number;

  @ApiProperty()
  cost: number;

  @ApiProperty()
  count: number;
}
