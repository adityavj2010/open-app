import { PartialType } from '@nestjs/swagger';
import { CreateBusinnessHourDto } from './create-businness-hour.dto';

export class UpdateBusinnessHourDto extends PartialType(CreateBusinnessHourDto) {}
