import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBusinessServiceDto } from './dto/create-business-service.dto';
import { UpdateBusinessServiceDto } from './dto/update-business-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessService } from './entities/business-service.entity';
import { ERRORS } from '../misc/errors';

@Injectable()
export class BusinessServicesService {
  constructor(
    @InjectRepository(BusinessService)
    private businnessServiceRepository: Repository<BusinessService>,
  ) {}

  async create(
    createBusinessServiceDto:
      | CreateBusinessServiceDto
      | CreateBusinessServiceDto[],
  ) {
    return this.businnessServiceRepository.insert(createBusinessServiceDto);
  }

  findAll(query = null) {
    return this.businnessServiceRepository.find(query);
  }

  findOne(id: number) {
    return this.businnessServiceRepository.findOne(id);
  }

  update(id: number, updateBusinessServiceDto: UpdateBusinessServiceDto) {
    return this.businnessServiceRepository.update(id,updateBusinessServiceDto);
  }

  remove(id: number) {
    return this.businnessServiceRepository.delete(id);
  }
}
