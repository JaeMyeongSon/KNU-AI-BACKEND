import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chatbot } from './chatbot';

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

  @Column('boolean')
  isUserMessage: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
