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
export class BServices {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business;

  @Column({ nullable: false })
  serviceName: string;

  @Column({ nullable: false })
  @Min(1)
  @Max(60)
  time: number;

  @Column({ nullable: false })
  @Min(0)
  cost: number;

  @Column({ nullable: false })
  @Min(0)
  count: number;
}
