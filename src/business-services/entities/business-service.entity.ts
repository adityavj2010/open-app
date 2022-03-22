import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Min, Max } from 'class-validator';
import { Business } from '../../business/entities/business.entity';

@Entity()
export class BusinessService {
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
