import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { BusinnessHoursModule } from '../businness-hours/businness-hours.module';
import { StaffsModule } from '../staffs/staffs.module';
import { Slot } from './entities/slot.entity';
import { BusinessServicesModule } from '../business-services/business-services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    TypeOrmModule.forFeature([Slot]),
    BusinnessHoursModule,
    StaffsModule,
    BusinessServicesModule,
  ],

  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
