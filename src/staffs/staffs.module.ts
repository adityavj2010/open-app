import { forwardRef, Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { BusinessModule } from '../business/business.module';

@Module({
  imports: [TypeOrmModule.forFeature([Staff])],
  controllers: [StaffsController],
  providers: [StaffsService, StaffsController],
  exports: [StaffsService, StaffsController],
})
export class StaffsModule {}
