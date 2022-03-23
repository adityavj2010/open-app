import { Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBusinessDto {
  @ApiPropertyOptional()
  uId: number;

  bName: string;

  bCity: string;

  bZip: string;

  bState: string;

  bType: string;
}
