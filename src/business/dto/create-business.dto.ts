import { Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBusinessDto {
  @ApiPropertyOptional()
  uId?: number;

  @ApiProperty()
  bName: string;

  @ApiProperty()
  bCity: string;

  @ApiProperty()
  bZip: string;

  @ApiProperty()
  bState: string;

  @ApiProperty()
  bType: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  image1?: string;

  @ApiPropertyOptional()
  image2?: string;

  @ApiPropertyOptional()
  image3?: string;

  @ApiPropertyOptional()
  lat?: string;

  @ApiPropertyOptional()
  long?: string;

  @ApiPropertyOptional()
  extraData3?: string;
}
