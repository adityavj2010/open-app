import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateStaffDto {
  @ApiPropertyOptional()
  bId?: number;

  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  igProfile?: string;

  @ApiPropertyOptional()
  fbProfile?: string;

  @ApiPropertyOptional()
  tiktokProfile?: string;

  @ApiPropertyOptional()
  desc?: string;

  @ApiPropertyOptional()
  profilePicture?: string;
}
