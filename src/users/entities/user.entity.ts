import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  emailId: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column()
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ unique: true, select: false })
  phoneNumber: string;

  @Column({ default: false, select: false })
  isVerified: boolean;

  @Column({ nullable: true, select: false })
  tempPassword: string;
}
