import { forwardRef, Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { UsersModule } from '../users/users.module';
import { StaffsModule } from '../staffs/staffs.module';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Business]),
    StaffsModule,
    forwardRef(() => UsersModule),
    forwardRef(() => AppointmentsModule),
  ],
  controllers: [BusinessController],
  providers: [BusinessService, BusinessController],
  exports: [BusinessService, BusinessController],
})
export class BusinessModule {}
