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
  @Min(30)
  @Max(30 * 6)
  time: number;

  @Column({ nullable: false })
  @Min(0)
  cost: number;

  @Column({ nullable: true })
  desc: string;

  @Column({ nullable: true, default: '' })
  picture: string;

  @Column({ nullable: true, default: '' })
  extraData: string;
}
