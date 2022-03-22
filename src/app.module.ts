import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { BusinessModule } from './business/business.module';
import { StaffsModule } from './staffs/staffs.module';
import { BusinnessHoursModule } from './businness-hours/businness-hours.module';
import { BusinessServicesModule } from './business-services/business-services.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './env/.development.env' }),
    TypeOrmModule.forRoot(),
    UsersModule,
    AppointmentsModule,
    BusinessModule,
    StaffsModule,
    BusinnessHoursModule,
    BusinessServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
