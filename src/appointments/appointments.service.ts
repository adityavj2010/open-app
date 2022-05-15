import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Query,
} from '@nestjs/common';
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
import { Slot } from './entities/slot.entity';
import { BusinessServicesService } from '../business-services/business-services.service';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private bHour: BusinnessHoursService,
    private staff: StaffsService,
    @InjectRepository(Slot)
    private slotRepository: Repository<Slot>,
    private businesServicesService: BusinessServicesService,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private mailService: MailService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const slot = await this.slotRepository.save({
        notes: createAppointmentDto.notes,
      });
      const bService = await this.businesServicesService.findOne(
        createAppointmentDto.serviceId,
      );
      const slotsToAdd = bService.time / 30;
      // console.warn({ slotsToAdd });
      let lastSlot;
      createAppointmentDto['slotId'] = slot.slotId;
      for (let i = 0; i < slotsToAdd; i++) {
        // console.log(i, slotsToAdd, 'Inserting ', createAppointmentDto);
        delete createAppointmentDto['appId'];
        if (!lastSlot) {
          lastSlot = await this.appointmentRepository.save(
            createAppointmentDto,
          );
        } else {
          await this.appointmentRepository.save(createAppointmentDto);
        }
        createAppointmentDto.startDateTime = new Date(
          addMinutes(new Date(createAppointmentDto.startDateTime), 30),
        );
      }
      return lastSlot;
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

  async findAll(query: FindManyOptions) {
    let apps = await this.appointmentRepository.find(query);
    apps = await Promise.all(
      apps.map(async (app) => {
        const slot = await this.slotRepository.findOne(app.slotId);
        const user = await this.userService.findOne(app.uId);
        if (user && app) {
          app = { ...app, ...user };
        }
        app['notes'] = slot.notes;
        return app;
      }),
    );
    return apps;
  }

  findOne(id: number) {
    return this.appointmentRepository.findOne(id).then((app) => {
      if (app) {
        return this.slotRepository.findOne(app.slotId).then((slot) => {
          return this.userService.findOne(app.uId).then((user) => {
            if (user && app) {
              app = { ...app, ...user };
            }

            app['notes'] = slot.notes;
            return app;
          });
        });
      }
      return app;
    });
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    console.log('update ID', id);
    if (updateAppointmentDto.notes) {
      const app = await this.findOne(id);
      console.log('app ID', app);
      await this.slotRepository.update(app.slotId, {
        notes: updateAppointmentDto.notes,
      });
      delete updateAppointmentDto.notes;
    }
    if (Object.keys(updateAppointmentDto).length == 0) {
      return 'Updated';
    }
    return this.appointmentRepository.update(id, updateAppointmentDto);
  }

  async remove(id: number) {
    console.log('ID', id);
    const appointment = await this.findOne(id);
    if (!appointment.slotId) {
      return new HttpException('Invalid slot id', HttpStatus.BAD_REQUEST);
    }
    const slotId = appointment.slotId;
    await this.appointmentRepository.delete({ slotId: appointment.slotId });
    await this.slotRepository.delete(slotId);
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
        time: addHours(slot[0], 4),
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

function addHours(date, hours) {
  // date = new Date(date);
  // date.setHours(date.getHours() + hours);

  return new Date(date);
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
