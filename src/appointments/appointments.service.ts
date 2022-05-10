import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { BusinnessHoursService } from '../businness-hours/businness-hours.service';
import { StaffsModule } from '../staffs/staffs.module';
import { StaffsService } from '../staffs/staffs.service';
import moment from 'moment';
import { ERRORS } from '../misc/errors';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private bHour: BusinnessHoursService,
    private staff: StaffsService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      return await this.appointmentRepository.save(createAppointmentDto);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        if (e['code'] == 'ER_DUP_ENTRY') {
          throw new HttpException(
            ERRORS.APPOINTMENT_ALREADY_TAKE,
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }
  }

  findAll(query: FindManyOptions) {
    return this.appointmentRepository.find(query);
  }

  findOne(id: number) {
    return this.appointmentRepository.findOne(id);
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentRepository.update(id, updateAppointmentDto);
  }

  remove(id: number) {
    return this.appointmentRepository.delete(id);
  }

  async getAvailableAppointmentsOfADay(date, bId) {
    const startDate = date.setHours(0, 0, 0, 0);
    const endDate = date.setHours(23, 59, 59, 0);
    const bHours = await this.bHour.findAll({ bId: bId });
    const staff = await this.staff.findAll({
      bId: bId,
    });
    const staffIds = [];
    for (let i = 0; i < staff.length; i++) {
      const staf = staff[i];
      staffIds.push(staf.id);
    }
    const appointments = await this.appointmentRepository.find({
      where: {
        bId: bId,
        startDateTime: MoreThanOrEqual(startDate),
      },
    });
    const allAppointment = {};
    const day = startDate.getDay();
    const bHour = bHours.find((obj) => obj.day === day);
    const startTime = bHour.startTime;
    const endTime = bHour.endTime;
    this.appointmentRepository.find({});
    for (; startTime < endTime; ) {}
  }

  async getAvailableAppointments(bId, startDate, endDate) {
    const available = [];
    const ed = moment(endDate);
    const sd = moment(startDate);

    const diff = ed.diff(sd, 'days');
    for (let i = 0; i < diff; i++) {
      startDate = addDays(startDate, 1);
    }
  }
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
