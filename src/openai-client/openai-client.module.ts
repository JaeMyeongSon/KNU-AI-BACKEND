import { Module } from '@nestjs/common';
import { OpenaiClientService } from './openai-client.service';
import { Chatbot } from '../schemas/chatbot.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotSetupMessage } from '../entities/chatbot-setup-message';

@Module({
  imports: [TypeOrmModule.forFeature([Chatbot, ChatbotSetupMessage])],
  providers: [OpenaiClientService],
  exports: [OpenaiClientService],
})
export class OpenaiClientModule {}
