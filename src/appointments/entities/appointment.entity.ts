import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Business } from '../../business/entities/business.entity';
import { User as Users } from '../../users/entities/user.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  appId: number;

  @Column({ nullable: false })
  bId: number;

  @Column({ nullable: false })
  uId: number;

  @Column({ nullable: false })
  startDateTime: Date;

  @Column({ default: false })
  repeat: boolean;

  @Column({ default: '' })
  notes: string;
}
