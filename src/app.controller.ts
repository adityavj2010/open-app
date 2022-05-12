import {
  Controller,
  Post,
  Body,
  Param,
  Logger,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
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
import { BusinessServicesController } from './business-services/business-services.controller';
import { BusinessController } from './business/business.controller';
import { BusinnessHoursController } from './businness-hours/businness-hours.controller';
import { StaffsController } from './staffs/staffs.controller';
import { UsersController } from './users/users.controller';

import { AuthService } from './auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    private readonly auth: AuthService,
    private readonly user: UsersService,
  ) {}
  private readonly logger = new Logger(AppController.name);
  @Post('bussiness-sign-up')
  @ApiOperation({ summary: 'Registers a business user' })
  @ApiResponse({
    status: 201,
    description: 'Return userId of created user',
    type: Response,
  })
  async businessSignUp(@Body() body: RegisterBussiness) {
    body.user.password = Math.random().toString(36).slice(-8);
    // body.user.password = 'password';
    const user = await this.userService.signUp(body.user);
    await this.mail
      .sendUserPassword(body.user.emailId, body.user.password)
      .then(console.log)
      .catch(console.error);

    this.logger.log(
      `Create user with ${body.user.emailId} with user id ${user} `,
    );
    body.business.uId = user;
    const business = await this.businessService.create(body.business);
    this.logger.log(
      `Create business with ${body.business.bName} with business id ${business} `,
    );

    for (let i = 0; i < body.businessHours.length; i++) {
      body.businessHours[i].bId = business;
    }
    await this.bussinessHours.create(body.businessHours);

    for (let i = 0; i < body.businessServices.length; i++) {
      body.businessServices[i].bId = business;
      await this.businessSerciceService.create(body.businessServices[i]);
    }
    for (let i = 0; i < body.staff.length; i++) {
      body.staff[i].bId = business;
      await this.staffs.create(body.staff[i]);
    }

    return this.auth.login(await this.user.findOne(user), { bId: business });
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
  signIn(@Body() body: SignInDto): Promise<{ token: string }> {
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

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './dist/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Post('file')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log();
    return {
      filename: file.filename,
    };
  }
}
