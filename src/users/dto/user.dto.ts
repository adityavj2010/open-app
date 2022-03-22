import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class userDto {
  @ApiProperty({ description: 'EmailId of the user', type: 'string' })
  @IsEmail()
  @IsNotEmpty()
  emailId: string;

  @IsNotEmpty()
  @ApiProperty()
  @Length(6, 20)
  password: string;

  @ApiProperty({ description: 'First name of the user' })
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiProperty()
  @Length(10, 10)
  phoneNumber: string;
}

export class createUserDto extends userDto {}
