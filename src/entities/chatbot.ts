import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatbotRole } from '../chatbots/chatbot.role';
import { ChatbotSetupMessage } from './chatbot-setup-message';

@Entity({ name: 'chatbots' })
export class Chatbot {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ type: 'enum', enum: ChatbotRole })
  role: ChatbotRole;

  @Column('varchar')
  name: string;

  @OneToMany(() => ChatbotSetupMessage, (setupMessage) => setupMessage.chatbot)
  setupMessages: ChatbotSetupMessage[];
}
