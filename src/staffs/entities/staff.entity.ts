import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Business } from '../../business/entities/business.entity';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  bId: number;

  @Column({ nullable: false })
  firstName: string;

  // Profile igProfile, fbProfile, tiktokProfile desc picture
  @Column({ nullable: true, default: '' })
  igProfile: string;

  @Column({ nullable: true, default: '' })
  fbProfile: string;

  @Column({ nullable: true, default: '' })
  tiktokProfile: string;

  @Column({ nullable: true, default: '' })
  desc: string;
}
