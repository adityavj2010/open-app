import { Test, TestingModule } from '@nestjs/testing';
import { BusinessServicesService } from './business-services.service';

describe('BusinessServicesService', () => {
  let service: BusinessServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessServicesService],
    }).compile();

    service = module.get<BusinessServicesService>(BusinessServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
