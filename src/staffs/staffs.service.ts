import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from '../business/entities/business.entity';
import { Staff } from './entities/staff.entity';
import { ERRORS } from '../misc/errors';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async create(staff: CreateStaffDto) {
    const staffs = await this.staffRepository.find({
      bId: staff.bId,
      emailId: staff.emailId,
    });
    if (staffs.length > 0) {
      throw new HttpException(
        ERRORS.STAFF_ALREADY_CREATED,
        HttpStatus.CONFLICT,
      );
    }
    return this.staffRepository.save(staff).then((item) => {
      return item.id;
    });
  }

  findAll() {
    return `This action returns all staffs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
