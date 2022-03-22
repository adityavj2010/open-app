import { Module } from '@nestjs/common';
import { BusinessServicesService } from './business-services.service';
import { BusinessServicesController } from './business-services.controller';

@Module({
  controllers: [BusinessServicesController],
  providers: [BusinessServicesService]
})
export class BusinessServicesModule {}
