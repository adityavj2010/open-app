import { userDto } from './user.dto';
import { ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';

export class CreateUserDto extends userDto {}

export class SignInDto extends PickType(CreateUserDto, ['emailId'] as const) {
  @ApiPropertyOptional()
  password: string;
}
