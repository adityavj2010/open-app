import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { UsersService } from '../users/users.service';
import { ERRORS } from '../misc/errors';
import { StaffsService } from '../staffs/staffs.service';
import { AppointmentsService } from '../appointments/appointments.service';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private readonly staffService: StaffsService,
    private readonly appointmentService: AppointmentsService,
  ) {}

  async create(business: CreateBusinessDto) {
    const users = await this.userService.findAll({
      id: business.uId,
    });
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

  async checkBusinessUserAssociation(bId, uId) {
    const business = await this.findOne(bId);
    if (business.uId !== uId) {
      throw new UnauthorizedException();
    }
  }

  async checkStaffBusinessAssociatino(id, bId) {
    const staff = await this.staffService.findOne(Number(id));
    if (staff.bId != bId) {
      throw new HttpException(ERRORS.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
  }

  async findAll(queryParams) {
    let startDate = null;
    if (queryParams.startDate) {
      startDate = queryParams.startDate;
      delete queryParams.startDate;
    }
    const businesses = await this.businessRepository.find(queryParams);
    if (startDate) {
      for (let i = 0; i < businesses.length; i++) {
        businesses[i]['availableAppointments'] =
          await this.appointmentService.getAvailableAppointmentsOfADay(
            new Date(startDate),
            businesses[i].bId,
          );
      }
    }

    return businesses;
  }

  findOne(id: number) {
    return this.businessRepository.findOne(id);
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return this.businessRepository.update(id, updateBusinessDto);
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
