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

  @OneToOne(() => User)
  @JoinColumn()
  bOwner: User;

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
