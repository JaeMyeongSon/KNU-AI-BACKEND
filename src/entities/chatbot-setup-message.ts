import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chatbot } from './chatbot';
import { OpenaiMessageRole } from '../openai-client/openai-message-role';

@Entity({ name: 'chatbot_setup_messages' })
export class ChatbotSetupMessage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'enum', enum: OpenaiMessageRole })
  role: OpenaiMessageRole;

  @Column('varchar', { length: 1000 })
  message: string;

  @Column({ name: 'chatbot_id' })
  chatbotId: number;

  @ManyToOne(() => Chatbot, (chatbot) => chatbot.setupMessages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'chatbot_id', referencedColumnName: 'id' }])
  chatbot: Chatbot;
}
