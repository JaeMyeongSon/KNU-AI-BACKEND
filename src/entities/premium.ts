import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'premiums' })
export class Premium {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @Column({ type: 'boolean', default: false })
  isExpired: boolean;

  @CreateDateColumn()
  startDate: Date;

  @Column({ name: 'end_date', nullable: true })
  endDate: Date;
}
