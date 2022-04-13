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

  async create(createBusinessServiceDto: CreateBusinessServiceDto) {
    return this.businnessServiceRepository.save(createBusinessServiceDto);
  }

  findAll(query = null) {
    return this.businnessServiceRepository.find(query);
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
