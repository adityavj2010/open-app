import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Min, Max } from 'class-validator';
import { Business } from '../../business/entities/business.entity';

@Entity()
@Unique(['bId', 'day', 'startTime', 'endTime'])
export class BusinnessHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  bId: number;

  @Column({ nullable: false })
  @Min(0)
  @Max(6)
  day: number;

  @Column({ nullable: false })
  @Min(0)
  @Max(24)
  startTime: number;

  @Column({ nullable: false })
  @Min(0)
  @Max(24)
  endTime: number;
}