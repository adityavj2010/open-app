import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BusinnessHoursService } from './businness-hours.service';
import { CreateBusinnessHourDto } from './dto/create-businness-hour.dto';
import { UpdateBusinnessHourDto } from './dto/update-businness-hour.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Business Hours')
@Controller('businness-hours')
export class BusinnessHoursController {
  constructor(private readonly businnessHoursService: BusinnessHoursService) {}

  @Post()
  create(
    @Body()
    createBusinnessHourDto: CreateBusinnessHourDto | CreateBusinnessHourDto[],
  ) {
    return this.businnessHoursService.create(createBusinnessHourDto);
  }

  @Get()
  findAll(@Query() queryParams) {
    console.log({ queryParams });
    return this.businnessHoursService.findAll(queryParams);
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
