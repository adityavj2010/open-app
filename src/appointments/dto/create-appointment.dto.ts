import { Column, PrimaryGeneratedColumn } from 'typeorm';
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

  @ApiProperty({ description: 'Staff Id' })
  staffId: number;

  @ApiProperty({ description: 'Service Id' })
  serviceId: number;

  @ApiPropertyOptional({ description: 'Any notes' })
  notes: string;
}
