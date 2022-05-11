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

  @Column({ nullable: false, unique: true })
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

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  image1: string;

  @Column({ default: '' })
  image2: string;

  @Column({ default: '' })
  image3: string;

  @Column({ default: '' })
  lat: string;

  @Column({ default: '' })
  long: string;

  @Column({ default: '' })
  extraData3: string;
}
