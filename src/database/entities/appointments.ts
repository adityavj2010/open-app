import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Business } from './business';
import { Min, Max } from 'class-validator';
import { Users } from './users';
import { BServices } from './b_services';

@Entity()
export class Appointments {
  @PrimaryGeneratedColumn()
  appId: number;

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business;

  @OneToOne(() => Users)
  @JoinColumn()
  user: Users;

  @Column({ nullable: false })
  startDateTime: Date;

  @Column({ default: false })
  repeat: boolean;

  @Column({ default: '' })
  notes: string;
}
