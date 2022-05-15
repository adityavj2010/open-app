import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { BusinessService } from '../business/business.service';
import { ERRORS } from '../misc/errors';
import { User } from './entities/user.entity';
import { GetContext } from '../misc/context';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }
  //
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    const ctx = GetContext(req);
    if (ctx.id !== Number(id)) {
      throw new UnauthorizedException();
    }
    return this.usersService.update(+id, updateUserDto);
  }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }

  @Get('get-info')
  getInfo(@Req() req) {
    const ctx = GetContext(req);
    return this.usersService.findOne(ctx.id);
  }

  signUp(user: CreateUserDto) {
    return this.usersService.signUp(user);
  }

  async requestTempPassword(emailId: string) {
    return this.usersService.requestTempPassword(emailId);
  }

  async signIn(body: SignInDto) {
    return this.usersService.signIn(body);
  }
}
