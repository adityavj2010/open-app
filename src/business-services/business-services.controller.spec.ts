import { Test, TestingModule } from '@nestjs/testing';
import { BusinessServicesController } from './business-services.controller';
import { BusinessServicesService } from './business-services.service';

describe('BusinessServicesController', () => {
  let controller: BusinessServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessServicesController],
      providers: [BusinessServicesService],
    }).compile();

    controller = module.get<BusinessServicesController>(BusinessServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
