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
import {
  CreateUserDto,
  RegisterBussiness,
  SignInDto,
} from './users/dto/create-user.dto';
import { MailService } from './mail/mail.service';
import { BusinessService } from './business/business.service';
import { BusinnessHoursService } from './businness-hours/businness-hours.service';
import { StaffsService } from './staffs/staffs.service';
import { BusinessServicesService } from './business-services/business-services.service';
import { BusinessServicesController } from './business-services/business-services.controller';
import { BusinessController } from './business/business.controller';
import { BusinnessHoursController } from './businness-hours/businness-hours.controller';
import { StaffsController } from './staffs/staffs.controller';
import { UsersController } from './users/users.controller';
import { Logger } from 'winston';
import { JwtService } from '@nestjs/jwt';

class Response {
  token: string;
}

@ApiTags('Core')
@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersController,
    private mail: MailService,
    private readonly businessService: BusinessController,
    private readonly businessSerciceService: BusinessServicesController,
    private readonly bussinessHours: BusinnessHoursController,
    private readonly staffs: StaffsController,
    private jwtService: JwtService,
  ) {}

  @Post('bussiness-sign-up')
  @ApiOperation({ summary: 'Registers a business user' })
  @ApiResponse({
    status: 201,
    description: 'Return userId of created user',
    type: Response,
  })
  async businessSignUp(@Body() body: RegisterBussiness) {
    body.user.password = Math.random().toString(36).slice(-8);

    const user = await this.userService.signUp(body.user);
    body.business.uId = user;
    const business = await this.businessService.create(body.business);
    for (let i = 0; i < body.businessHours.length; i++) {
      body.businessHours[i].bId = business;
      await this.bussinessHours.create(body.businessHours[i]);
    }
    for (let i = 0; i < body.businessServices.length; i++) {
      body.businessServices[i].bId = business;
      await this.businessSerciceService.create(body.businessServices[i]);
    }
    for (let i = 0; i < body.staff.length; i++) {
      body.staff[i].bId = business;
      await this.staffs.create(body.staff[i]);
    }
    await this.mail.sendUserPassword(body.user.emailId, body.user.password);
    return { token: this.jwtService.sign({ userId: user }) };
  }

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
