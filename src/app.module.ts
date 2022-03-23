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
import { User } from './users/entities/user.entity';
import { Business } from './business/entities/business.entity';
import { Staff } from './staffs/entities/staff.entity';
import { BusinnessHour } from './businness-hours/entities/businness-hour.entity';
import { BusinessService } from './business-services/entities/business-service.entity';
import { Appointment } from './appointments/entities/appointment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './env/.development.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'openapp',
      entities: [
        User,
        Business,
        Staff,
        BusinnessHour,
        BusinessService,
        Appointment,
      ],
      synchronize: true,
      keepConnectionAlive: true,
    }),
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
