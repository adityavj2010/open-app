import { Test, TestingModule } from '@nestjs/testing';
import { BusinnessHoursController } from './businness-hours.controller';
import { BusinnessHoursService } from './businness-hours.service';

describe('BusinnessHoursController', () => {
  let controller: BusinnessHoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinnessHoursController],
      providers: [BusinnessHoursService],
    }).compile();

    controller = module.get<BusinnessHoursController>(BusinnessHoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
