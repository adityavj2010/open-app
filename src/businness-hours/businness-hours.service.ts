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

  async create(
    createBusinnessHourDto: CreateBusinnessHourDto | CreateBusinnessHourDto[],
  ) {
    let bid = 1;
    if (createBusinnessHourDto.constructor.name === 'Array') {
      bid = createBusinnessHourDto[0].bId;
    } else {
      bid = createBusinnessHourDto['bId'];
    }
    await this.businnessHoursRepository.delete({ bId: bid });
    return this.businnessHoursRepository.insert(createBusinnessHourDto);
  }

  findAll(query = null) {
    return this.businnessHoursRepository.find(query);
  }

  findOne(id: number) {
    return this.businnessHoursRepository.findOne(id);
  }

  update(id: number, updateBusinnessHourDto: UpdateBusinnessHourDto) {
    return this.businnessHoursRepository.update(id, updateBusinnessHourDto);
  }

  remove(id: number) {
    return this.businnessHoursRepository.delete(id);
  }
}
