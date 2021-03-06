import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Between,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Raw,
} from 'typeorm';
import { convertToMySQLDate } from '../misc/date';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // @Post()
  // create(@Body() createAppointmentDto: CreateAppointmentDto) {
  //   return this.appointmentsService.create(createAppointmentDto);
  // }

  @Get('available')
  async getAvailableAppointments(
    @Query('bId') bId: number,
    @Query('startDate') startDate = new Date(),
    @Query('endDate') endDate = null,
    @Query('staffId') staffId = null,
  ) {
    if (!endDate) {
      endDate = new Date();
      endDate.setDate(startDate.getDate() + 7);
    }
    if (bId == null) {
      throw new HttpException('Invalid Bid', HttpStatus.BAD_REQUEST);
    }

    const slots = await this.appointmentsService.getAvailableAppointments(
      bId,
      startDate,
      endDate,
    );
    if (staffId == null) {
      return slots;
    }
    const l = slots.length;
    const res_slots = [];
    for (let i = 0; i < l; i++) {
      const slot = slots[i];
      if (slot.availableStaff.find((val) => val == staffId)) {
        res_slots.push(slot);
      }
    }
    return res_slots;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }

  @Post('book')
  bookAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  async findAll(
    @Query('bId') bId: number,
    @Query('startDate') startDate = null,
    @Query('endDate') endDate = null,
    @Query('uId') uId: number,
    @Query('staffId') staffId: number,
    @Query('serviceId') serviceId: number,
  ) {
    let flag = false;
    const searchParams = {};

    if (startDate) {
      startDate = new Date(startDate);
      // startDate = new Date(
      //   startDate.getFullYear(),
      //   startDate.getMonth(),
      //   startDate.getDate(),
      // );
      startDate = subtractHours(startDate, 4);
      searchParams['startDateTime'] = MoreThan(startDate);
      flag = true;
    } else {
      // const date = new Date();
      // startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      startDate = new Date();
    }

    if (endDate) {
      endDate = new Date(endDate);
      endDate = subtractHours(endDate, 4);
    } else {
      endDate = new Date();
      endDate.setDate(startDate.getDate() + 30);
      endDate = new Date(endDate);
    }
    // const startDateTime = Raw(
    //   (alias) => {
    //     return `${alias} > :startDate and ${alias} < :endDate`;
    //   },
    //   {
    //     startDate,
    //     endDate,
    //   },
    // );
    if (uId) {
      searchParams['uId'] = uId;
    }
    if (bId) {
      searchParams['bId'] = bId;
    }
    if (staffId) {
      searchParams['staffId'] = staffId;
    }

    // console.log({ searchParams });
    return this.appointmentsService.findAll({
      ...searchParams,
    });
  }
}

function subtractHours(date, hours) {
  // date.setHours(date.getHours() - hours);

  return new Date(date);
}

function getDateOnly() {
  const date = new Date();
}
