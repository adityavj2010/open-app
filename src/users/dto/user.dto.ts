import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

export class userDto {
  @ApiProperty({ description: 'EmailId of the user', type: 'string' })
  @IsEmail()
  @IsNotEmpty()
  emailId: string;

  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Password of the user', type: 'string' })
  @Length(6, 20)
  password?: string;

  @ApiProperty({ description: 'First name of the user', type: 'string' })
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({ description: 'Last name of the user', type: 'string' })
  lastName: string;

  @ApiProperty({ description: 'Phone Number of the user', type: 'string' })
  @Length(10, 10)
  phoneNumber: string;
}
