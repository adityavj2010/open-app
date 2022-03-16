import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Business } from './business';
import { Min, Max } from 'class-validator';

@Entity()
export class BHours {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business;

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
