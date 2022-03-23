import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusinnessHoursService } from './businness-hours.service';
import { CreateBusinnessHourDto } from './dto/create-businness-hour.dto';
import { UpdateBusinnessHourDto } from './dto/update-businness-hour.dto';

@Controller('businness-hours')
export class BusinnessHoursController {
  constructor(private readonly businnessHoursService: BusinnessHoursService) {}

  @Post()
  create(@Body() createBusinnessHourDto: CreateBusinnessHourDto) {
    return this.businnessHoursService.create(createBusinnessHourDto);
  }

  @Get()
  findAll() {
    return this.businnessHoursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businnessHoursService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinnessHourDto: UpdateBusinnessHourDto,
  ) {
    return this.businnessHoursService.update(+id, updateBusinnessHourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businnessHoursService.remove(+id);
  }
}
