import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'emails' })
export class Email {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @Column('varchar', { length: 50 })
  email: string;

  @IsNotEmpty()
  @Column('int')
  verify: number;

  @CreateDateColumn()
  createdAt: Date;
}
