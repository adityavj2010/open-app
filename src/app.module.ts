import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ContextMiddleware } from '../middleware/context.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './env/.development.env' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend', 'dist', 'open-app'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_URL ? process.env.DATABASE_URL : 'localhost',
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
    AuthModule,
    UsersModule,
    AppointmentsModule,
    BusinessModule,
    StaffsModule,
    BusinnessHoursModule,
    BusinessServicesModule,
    MailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
