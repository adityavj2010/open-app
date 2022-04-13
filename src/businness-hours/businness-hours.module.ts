import { Module } from '@nestjs/common';
import { BusinnessHoursService } from './businness-hours.service';
import { BusinnessHoursController } from './businness-hours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinnessHour } from './entities/businness-hour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinnessHour])],
  controllers: [BusinnessHoursController],
  providers: [BusinnessHoursService, BusinnessHoursController],
  exports: [BusinnessHoursService, BusinnessHoursController],
})
export class BusinnessHoursModule {}
