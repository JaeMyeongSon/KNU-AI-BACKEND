import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chat } from './chat';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 100 })
  password: string;

  @Column('int', { default: 10, nullable: false })
  rateLimit: number;

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
