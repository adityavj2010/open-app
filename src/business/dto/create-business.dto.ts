import { Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBusinessDto {
  @ApiPropertyOptional()
  uId: number;

  @ApiProperty()
  bName: string;

  bCity: string;

  bZip: string;

  bState: string;

  bType: string;
}
