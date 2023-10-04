import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatbotSetupMessage } from './chatbot-setup-message';

@Entity({ name: 'chatbots' })
export class Chatbot {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column()
  role: string;

  @Column('varchar')
  name: string;

  @OneToMany(() => ChatbotSetupMessage, (setupMessage) => setupMessage.chatbot)
  setupMessages: ChatbotSetupMessage[];
}
