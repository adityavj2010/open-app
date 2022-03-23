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
@Unique(['bId', 'emailId'])
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  bId: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  emailId: string;
}
