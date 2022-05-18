import { forwardRef, Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { BusinnessHoursModule } from '../businness-hours/businness-hours.module';
import { StaffsModule } from '../staffs/staffs.module';
import { Slot } from './entities/slot.entity';
import { BusinessServicesModule } from '../business-services/business-services.module';
import { UsersModule } from '../users/users.module';
import { BusinessModule } from '../business/business.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    TypeOrmModule.forFeature([Slot]),
    BusinnessHoursModule,
    StaffsModule,
    BusinessServicesModule,
    forwardRef(() => UsersModule),
    forwardRef(() => BusinessModule),
    MailModule,
  ],

  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
