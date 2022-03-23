import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { UsersService } from '../users/users.service';
import { ERRORS } from '../misc/errors';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
    private readonly userService: UsersService,
  ) {}

  async create(business: CreateBusinessDto) {
    const users = await this.userService.findAll({
      id: business.uId,
    });
    console.log('USER ID', business.uId);
    if (users.length == 0) {
      throw new HttpException(ERRORS.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    const businesses = await this.businessRepository.find({
      bName: business.bName,
    });
    if (businesses.length > 0) {
      throw new HttpException(ERRORS.BNAME_ALREADY_TAKEN, HttpStatus.CONFLICT);
    }
    return this.businessRepository.save(business).then((business) => {
      return business.bId;
    });
  }

  findAll() {
    return `This action returns all business`;
  }

  findOne(id: number) {
    return `This action returns a #${id} business`;
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
