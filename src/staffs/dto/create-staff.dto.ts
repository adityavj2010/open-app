import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateStaffDto {
  @ApiPropertyOptional()
  bId?: number;

  @ApiPropertyOptional()
  firstName: string;

  @ApiProperty()
  emailId: string;

  @ApiPropertyOptional()
  description?: string;
}
