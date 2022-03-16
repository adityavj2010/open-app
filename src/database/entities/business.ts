import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './users';

@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  uId: number;

  @OneToOne(() => Users)
  @JoinColumn()
  bOwner: Users;

  @Column({ nullable: false })
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
