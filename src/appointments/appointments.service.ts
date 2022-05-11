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
  Raw,
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
    let startDate = new Date(date.setHours(0, 0, 0, 0));
    let endDate = new Date(date.setHours(23, 59, 59, 0));
    const bHours = await this.bHour.findAll({ bId: bId });
    const staff = await this.staff.findAll({
      bId: bId,
    });
    const staffIds = [];
    for (let i = 0; i < staff.length; i++) {
      const staf = staff[i];
      staffIds.push(staf.id);
    }

    const appointments = await this.findAll({
      where: {
        bId: bId,
        startDateTime: Raw(
          (alias) => {
            return `${alias} > :startDate and ${alias} < :endDate`;
          },
          {
            startDate,
            endDate,
          },
        ),
      },
    });

    const day = startDate.getDay();
    const bHour = bHours.find((obj) => obj.day == day);
    if (bHour == undefined) {
      return [];
    }
    const startTime = bHour.startTime;
    const endTime = bHour.endTime;
    startDate = setTime(startDate, startTime);
    endDate = setTime(endDate, endTime);

    const slots = {};
    for (; startDate < endDate; ) {
      slots[startDate.toString()] = [...staffIds];
      startDate = addMinutes(startDate, 30);
    }
    appointments.forEach((appointment) => {
      const startDateTime = appointment.startDateTime.toString();

      if (!slots[startDateTime]) {
        return;
      }
      slots[startDateTime] = slots[startDateTime].filter((id) => {
        return id != appointment.staffId;
      });
      if (slots[startDateTime].length == 0) {
        delete slots[startDateTime];
      }
    });
    let slotsArray: any = Object.entries(slots);
    slotsArray = slotsArray.map((slot) => {
      return {
        time: slot[0],
        availableStaff: slot[1],
      };
    });
    return slotsArray;
  }

  async getAvailableAppointments(bId, startDate, endDate) {
    const ed = new Date(endDate);
    const sd = new Date(startDate);
    const date1 = ed;
    const date2 = sd;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const slots = [];
    const diff = diffDays;
    for (let i = 0; i < diff; i++) {
      startDate = addDays(startDate, 1);
      const slotsOfTheday = await this.getAvailableAppointmentsOfADay(
        startDate,
        bId,
      );
      for (let i = 0; i < slotsOfTheday.length; i++) {
        slots.push(slotsOfTheday[i]);
      }
    }
    return slots;
  }
}

const setTime = function (dt, time) {
  const [hr, min, sec] = time.split(':').map((value) => Number(value));
  dt.setHours(hr, min, sec);
  return new Date(dt);
};

const addMinutes = function (dt, minutes) {
  return new Date(dt.getTime() + minutes * 60000);
};
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
