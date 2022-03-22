import { Injectable } from '@nestjs/common';
import { CreateBusinnessHourDto } from './dto/create-businness-hour.dto';
import { UpdateBusinnessHourDto } from './dto/update-businness-hour.dto';

@Injectable()
export class BusinnessHoursService {
  create(createBusinnessHourDto: CreateBusinnessHourDto) {
    return 'This action adds a new businnessHour';
  }

  findAll() {
    return `This action returns all businnessHours`;
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
