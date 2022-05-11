import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateBusinnessHourDto {
  @ApiPropertyOptional()
  bId?: number;

  @ApiProperty()
  day: number;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiPropertyOptional()
  isWorking?: boolean;
}
