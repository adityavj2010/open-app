import { Get, Controller, Post, Req, Body, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import {
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users/users.service';
import { CreateUserDto, SignInDto } from './users/dto/create-user.dto';

@ApiTags('Core')
@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Registers a business user' })
  @ApiResponse({
    status: 201,
    description: 'Return userId of created user',
    type: Number,
  })
  signUp(@Body() body: CreateUserDto): Promise<number> {
    return this.userService.signUp(body);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign ins a user' })
  @ApiResponse({
    status: 201,
    description: 'Return jwt token',
    type: Number,
  })
  signIn(@Body() body: SignInDto): Promise<string> {
    return this.userService.signIn(body);
  }

  @Post('request-temp-password/:userId')
  @ApiOperation({ summary: 'Requests a temporary password of a user' })
  @ApiResponse({
    status: 201,
    description: 'Return userId of created user',
    type: Number,
  })
  requestTempPassword(@Param('userId') userId: number): Promise<string> {
    return this.userService.requestTempPassword(userId);
  }
}
