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
@Unique(['bId', 'day'])
export class BusinnessHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  bId: number;

  @Column({ nullable: false })
  @Min(0)
  @Max(6)
  day: number;

  //TODO change to date time
  @Column({ type: 'time', nullable: true,default:'01:00:00' })
  startTime: string;

  @Column({ type: 'time', nullable: true ,default:'01:00:00'})
  endTime: string;

  @Column({ type: 'boolean', default: true })
  isWorking: boolean;
}
