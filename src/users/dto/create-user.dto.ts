import { userDto } from './user.dto';
import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { CreateStaffDto } from '../../staffs/dto/create-staff.dto';
import { ValidateNested } from 'class-validator';
import { BusinessService } from '../../business/business.service';
import { CreateBusinessServiceDto } from '../../business-services/dto/create-business-service.dto';
import { CreateBusinnessHourDto } from '../../businness-hours/dto/create-businness-hour.dto';
import { CreateBusinessDto } from '../../business/dto/create-business.dto';
import { type } from 'os';

export class CreateUserDto extends userDto {}

export class SignInDto extends PickType(CreateUserDto, ['emailId'] as const) {
  @ApiPropertyOptional()
  password: string;
}

export class RegisterBussiness {
  @ApiProperty()
  user: CreateUserDto;

  @ApiProperty({ type: [CreateBusinessServiceDto] })
  businessServices: CreateBusinessServiceDto[];

  @ApiProperty({ type: [CreateBusinnessHourDto] })
  businessHours: CreateBusinnessHourDto[];

  @ApiProperty()
  business: CreateBusinessDto;

  @ApiProperty({ type: [CreateStaffDto] })
  staff: CreateStaffDto[];
}
