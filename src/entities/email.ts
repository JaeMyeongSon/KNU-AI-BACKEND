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

  @Column('varchar', { length: 50 })
  email: string;

  @Column('bigint')
  verify: number;

  @CreateDateColumn()
  createdAt: Date;
}
