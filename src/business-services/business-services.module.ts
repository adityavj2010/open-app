import { Module } from '@nestjs/common';
import { BusinessServicesService } from './business-services.service';
import { BusinessServicesController } from './business-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessService } from './entities/business-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessService])],
  controllers: [BusinessServicesController],
  providers: [BusinessServicesService],
  exports: [BusinessServicesService],
})
export class BusinessServicesModule {}
