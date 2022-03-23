import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  bId: number;

  @Column({ nullable: false })
  uId: number;

  @Column({ nullable: false, unique: true })
  bName: string;

  @Column({ nullable: false })
  bCity: string;

  @Column()
  bZip: string;

  @Column()
  bState: string;

  @Column()
  bType: string;
}
