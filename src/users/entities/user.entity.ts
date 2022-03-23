import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  emailId: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ default: false })
  isVerified: boolean;
}
