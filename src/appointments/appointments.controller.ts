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
  getAvailableAppointments(
    @Query('bId') bId,
    @Query('startDate') startDate = new Date(),
    @Query('endDate') endDate = null,
  ) {
    if (!endDate) {
      endDate = new Date();
      endDate.setDate(startDate.getDate() + 7);
    }
    if (bId == null) {
      throw new HttpException('Invalid Bid', HttpStatus.BAD_REQUEST);
    }

    return this.appointmentsService.getAvailableAppointments(
      bId,
      startDate,
      endDate,
    );
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
    @Query('bId') bId,
    @Query('startDate') startDate = null,
    @Query('endDate') endDate = null,
    @Query('uId') uId,
    @Query('staffId') staffId,
    @Query('serviceId') serviceId,
  ) {
    let flag = false;
    if (startDate) {
      startDate = new Date(startDate);
      // startDate = new Date(
      //   startDate.getFullYear(),
      //   startDate.getMonth(),
      //   startDate.getDate(),
      // );

      flag = true;
    } else {
      // const date = new Date();
      // startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      startDate = new Date();
    }
    startDate = subtractHours(startDate, 4);

    if (endDate) {
      endDate = new Date(endDate);
      endDate = subtractHours(endDate, 4);
    } else {
      endDate = new Date();
      endDate.setDate(startDate.getDate() + 30);
      endDate = new Date(endDate);
    }
    const searchParams = {};

    if (uId) {
      searchParams['uId'] = uId;
    }
    if (bId) {
      searchParams['bId'] = bId;
    }
    if (staffId) {
      searchParams['staffId'] = staffId;
    }
    return this.appointmentsService.findAll({
      ...searchParams,
      where: {
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
  }
}

function subtractHours(date, hours) {
  date.setHours(date.getHours() - hours);

  return new Date(date);
}

function getDateOnly() {
  const date = new Date();
}
