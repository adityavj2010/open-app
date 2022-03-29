import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBusinnessHourDto } from './dto/create-businness-hour.dto';
import { UpdateBusinnessHourDto } from './dto/update-businness-hour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../staffs/entities/staff.entity';
import { Repository } from 'typeorm';
import { BusinnessHour } from './entities/businness-hour.entity';
import { ERRORS } from '../misc/errors';

@Injectable()
export class BusinnessHoursService {
  constructor(
    @InjectRepository(BusinnessHour)
    private businnessHoursRepository: Repository<BusinnessHour>,
  ) {}

  async create(createBusinnessHourDto: CreateBusinnessHourDto) {
    const entries = await this.findAll(createBusinnessHourDto);
    if (entries.length > 0) {
      throw new HttpException(ERRORS.DUPLICATE_ENTRY, HttpStatus.CONFLICT);
    }
    return this.businnessHoursRepository.save(createBusinnessHourDto);
  }

  findAll(query = null) {
    return this.businnessHoursRepository.find(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} businnessHour`;
  }

  update(id: number, updateBusinnessHourDto: UpdateBusinnessHourDto) {
    return `This action updates a #${id} businnessHour`;
  }

  remove(id: number) {
    return `This action removes a #${id} businnessHour`;
  }
}
