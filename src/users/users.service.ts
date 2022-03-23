import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './dto/user.dto';
import { ERRORS } from '../misc/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll(query = null) {
    return this.usersRepository.find(query);
  }

  findOne(id) {
    return this.usersRepository.findOne(id).then((user) => {
      delete user.password;
      return user;
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto).then(() => {
      return 'Updated';
    });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async signUp(user: createUserDto) {
    const users = await this.usersRepository.find({ emailId: user.emailId });

    if (users.length > 0) {
      throw new HttpException(ERRORS.EMAIL_TAKEN, HttpStatus.CONFLICT);
    }
    return this.create(user).then((user: User) => {
      return user.id;
    });
  }
}
