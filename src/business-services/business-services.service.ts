import { Injectable } from '@nestjs/common';
import { CreateBusinessServiceDto } from './dto/create-business-service.dto';
import { UpdateBusinessServiceDto } from './dto/update-business-service.dto';

@Injectable()
export class BusinessServicesService {
  create(createBusinessServiceDto: CreateBusinessServiceDto) {
    return 'This action adds a new businessService';
  }

  findAll() {
    return `This action returns all businessServices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessService`;
  }

  update(id: number, updateBusinessServiceDto: UpdateBusinessServiceDto) {
    return `This action updates a #${id} businessService`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessService`;
  }
}
