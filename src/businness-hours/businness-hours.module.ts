import { Module } from '@nestjs/common';
import { BusinnessHoursService } from './businness-hours.service';
import { BusinnessHoursController } from './businness-hours.controller';

@Module({
  controllers: [BusinnessHoursController],
  providers: [BusinnessHoursService]
})
export class BusinnessHoursModule {}
