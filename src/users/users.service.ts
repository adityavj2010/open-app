import {
  forwardRef,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from '../misc/errors';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { BusinessService } from '../business/business.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private auth: AuthService,
    private businessService: BusinessService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll(query = null) {
    return this.usersRepository.find(query);
  }

  async findOneByEmail(email): Promise<User> {
    const users = await this.usersRepository.find({ emailId: email });
    if (users.length != 0) {
      throw new HttpException(
        'Duplicate entries found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return users[0];
  }

  findOne(id) {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto).then(() => {
      return 'Updated';
    });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async signUp(user: CreateUserDto) {
    const users = await this.usersRepository.find({ emailId: user.emailId });

    if (users.length > 0) {
      throw new HttpException(ERRORS.EMAIL_TAKEN, HttpStatus.CONFLICT);
    }
    return this.create(user).then((user: User) => {
      return user.id;
    });
  }

  async requestTempPassword(userId: number) {
    const user = await this.findOne(userId);
    if (user == null) {
      throw new HttpException(ERRORS.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    const randomText = Math.random().toString(36).slice(-8);
    try {
      await this.usersRepository.update(userId, { tempPassword: randomText });
      //TODO Add send mail logic
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return 'Success';
  }

  async signIn(body: SignInDto) {
    let tempPassword = false;
    let users = await this.findAll({
      emailId: body.emailId,
      password: body.password,
    });
    if (users.length == 0) {
      users = await this.findAll({
        emailId: body.emailId,
        tempPassword: body.password,
      });
      if (users.length == 1) {
        tempPassword = true;
      }
    }
    if (users.length == 0) {
      throw new HttpException(
        ERRORS.INVALID_CREDENTIALS,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = users[0];

    const response = await this.auth.login(user);
    const businesses = await this.businessService.findAll({ uId: user.id });
    let business = {};
    if (businesses.length >= 1) {
      business = businesses[0];
    }
    return { ...response, ...user, ...business };
  }
}
