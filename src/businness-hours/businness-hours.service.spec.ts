import { Test, TestingModule } from '@nestjs/testing';
import { BusinnessHoursService } from './businness-hours.service';

describe('BusinnessHoursService', () => {
  let service: BusinnessHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinnessHoursService],
    }).compile();

    service = module.get<BusinnessHoursService>(BusinnessHoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
