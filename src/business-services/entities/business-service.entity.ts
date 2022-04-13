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
@Unique(['bId', 'serviceName'])
export class BusinessService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  bId: number;

  @Column({ nullable: false })
  serviceName: string;

  @Column({ nullable: false })
  @Min(1)
  @Max(60)
  time: number;

  @Column({ nullable: false })
  @Min(0)
  cost: number;
}
