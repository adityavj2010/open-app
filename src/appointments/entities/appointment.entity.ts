import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['bId', 'staffId', 'startDateTime'])
export class Appointment {
  @PrimaryGeneratedColumn()
  appId: number;

  @Column({ nullable: false })
  bId: number;

  @Column({ nullable: false })
  uId: number;

  @Column({ nullable: false })
  staffId: number;

  @Column({ nullable: false })
  serviceId: number;

  @Column({ nullable: false })
  startDateTime: Date;

  @Column({ nullable: false })
  slotId: number;
}
