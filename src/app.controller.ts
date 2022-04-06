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

@ApiTags('Core')
@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersService,
    private mail: MailService,
    private readonly businessService: BusinessService,
    private readonly businessSerciceService: BusinessServicesService,
    private readonly bussinessHours: BusinnessHoursService,
    private readonly staffs: StaffsService,
  ) {}

  @Post('bussiness-sign-up')
  @ApiOperation({ summary: 'Registers a business user' })
  @ApiResponse({
    status: 201,
    description: 'Return userId of created user',
    type: Number,
  })
  async businessSignUp(@Body() body: RegisterBussiness) {
    console.log({ body });
    body.user.password = Math.random().toString(36).slice(-8);

    const user = await this.userService.create(body.user);
    body.business.uId = user.id;
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

    return Promise.resolve(1);
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

  @Get()
  test() {
    return this.mail.sendUserConfirmation();
  }
}
