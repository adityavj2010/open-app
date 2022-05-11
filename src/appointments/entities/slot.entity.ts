import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  slotId: number;

  @Column({ default: '' })
  notes: string;
}
