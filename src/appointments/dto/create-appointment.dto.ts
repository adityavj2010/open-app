import { Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'Business Service Id' })
  bsId: number;

  @ApiProperty({ description: 'Business Id' })
  bId: number;

  @ApiProperty({ description: 'User Id' })
  uId: number;

  @ApiProperty({ description: 'start date time' })
  startDateTime: Date;

  @ApiPropertyOptional({
    description: 'Is it suppose to be repeated',
    default: false,
  })
  repeat: boolean;

  @ApiPropertyOptional({ description: 'Any notes' })
  notes: string;
}
