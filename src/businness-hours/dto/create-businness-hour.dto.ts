import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBusinnessHourDto {
  @ApiPropertyOptional()
  bId?: number;

  @ApiProperty()
  day: number;

  @ApiProperty()
  startTime: number;

  @ApiProperty()
  endTime: number;
}
