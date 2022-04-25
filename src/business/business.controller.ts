import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { ApiTags } from '@nestjs/swagger';
import { StaffsService } from '../staffs/staffs.service';
import { CreateStaffDto } from '../staffs/dto/create-staff.dto';
import { UpdateStaffDto } from '../staffs/dto/update-staff.dto';
import { ERRORS } from '../misc/errors';
import { Business } from './entities/business.entity';
import { GetContext } from '../misc/context';

@ApiTags('Business')
@Controller('business')
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly staffService: StaffsService,
  ) {}

  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Get()
  findAll() {
    return this.businessService.findAll(null);
  }

  @Get('get-owned-business')
  async getOwnBusiness(@Req() req): Promise<Business> {
    const ctx = GetContext(req);
    console.log({ ctx });
    const businesses = await this.businessService.findAll({ uId: ctx.id });
    return businesses[0];
  }

  @Get(':bId/staff')
  findAllStaff(@Param('bId') bId) {
    return this.staffService.findAll({ bId: bId });
  }

  @Post(':bId/staff')
  createStaff(@Param('bId') bId, @Body() body: CreateStaffDto) {
    body.bId = bId;
    return this.staffService.create(body);
  }

  @Patch(':bId/staff/:id')
  async updateStaff(
    @Req() req,
    @Param('id') id: number,
    @Param('bId') bId: number,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    await this.businessService.checkBusinessUserAssociation(
      bId,
      GetContext(req).id,
    );
    await this.businessService.checkStaffBusinessAssociatino(id, bId);
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(':bId/staff/:id')
  async deleteStaff(
    @Req() req,
    @Param('id') id: number,
    @Param('bId') bId: number,
  ) {
    await this.businessService.checkBusinessUserAssociation(
      bId,
      GetContext(req).id,
    );
    await this.businessService.checkStaffBusinessAssociatino(id, bId);

    return this.staffService.remove(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
    @Req() req,
  ) {
    const ctx = GetContext(req);
    await this.businessService.checkBusinessUserAssociation(id, ctx.id);
    return this.businessService.update(+id, updateBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessService.remove(+id);
  }
}
