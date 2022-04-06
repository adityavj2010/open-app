import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStaffDto {
  @ApiPropertyOptional()
  bId: number;

  @ApiPropertyOptional()
  firstName: string;

  @ApiProperty()
  emailId: string;
}
