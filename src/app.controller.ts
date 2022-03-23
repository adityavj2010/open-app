import { Get, Controller, Post, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserDto } from './users/dto/user.dto';
import { UsersService } from './users/users.service';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  dummy() {
    return 'Hello';
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Registers a business user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'Success', type: Number })
  signUp(@Body() body: createUserDto): Promise<number> {
    return this.userService.signUp(body);
  }
}
