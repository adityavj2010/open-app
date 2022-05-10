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
import { BusinessServicesService } from './business-services.service';
import { CreateBusinessServiceDto } from './dto/create-business-service.dto';
import { UpdateBusinessServiceDto } from './dto/update-business-service.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Business Services')
@Controller('business-services')
export class BusinessServicesController {
  constructor(
    private readonly businessServicesService: BusinessServicesService,
  ) {}

  @Post()
  create(
    @Body()
    createBusinessServiceDto:
      | CreateBusinessServiceDto
      | CreateBusinessServiceDto[],
  ) {
    return this.businessServicesService.create(createBusinessServiceDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.businessServicesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessServicesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessServiceDto: UpdateBusinessServiceDto,
  ) {
    return this.businessServicesService.update(+id, updateBusinessServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessServicesService.remove(+id);
  }
}
