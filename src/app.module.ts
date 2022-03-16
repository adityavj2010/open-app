import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users/users.controller';
import { BusinessController } from './controllers/business/business.controller';
import { AppointmentsController } from './controllers/appointments/appointments.controller';
import { UsersService } from './services/users/users.service';
import { AppointmentsService } from './services/appointments/appointments.service';
import { BusinessService } from './services/business/business.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './env/.development.env' }),
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController, UsersController, BusinessController, AppointmentsController],
  providers: [AppService, UsersService, AppointmentsService, BusinessService],
})
export class AppModule {}
