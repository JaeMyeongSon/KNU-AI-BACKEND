import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chatbot } from './chatbot';
import { User } from './user';

@Entity({ name: 'chats' })
export class Chat {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('varchar', { length: 1000 })
  message: string;

  @Column({ name: 'chatbot_id' })
  chatbotId: number;

  @ManyToOne(() => Chatbot, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'chatbot_id', referencedColumnName: 'id' }])
  chatbot: Chatbot;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @Column('boolean')
  isUserMessage: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
