import { ApiProperty } from '@nestjs/swagger';

export class CreateBusinnessHourDto {
  @ApiProperty()
  bId: number;

  @ApiProperty()
  day: number;

  @ApiProperty()
  startTime: number;

  @ApiProperty()
  endTime: number;
}
