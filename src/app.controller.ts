import { Get, Controller, Post, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  dummy() {
    return 'Hello';
  }

  @Get('register')
  @ApiOperation({ summary: 'Registers a business user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'Success' })
  registerBusinessUser(@Body() body) {
    return 'Yes working';
  }
}
