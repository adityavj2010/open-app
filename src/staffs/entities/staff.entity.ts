import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Business } from '../../business/entities/business.entity';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false, unique: true })
  emailId: string;
}
