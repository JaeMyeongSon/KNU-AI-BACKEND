import { Module } from '@nestjs/common';
import { ChatbotsController } from './chatbots.controller';
import { ChatbotsService } from './chatbots.service';
import { OpenaiClientModule } from '../openai-client/openai-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chatbot } from '../entities/chatbot';
import { Chat } from '../entities/chat';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Chatbot]), OpenaiClientModule],
  controllers: [ChatbotsController],
  providers: [ChatbotsService],
})
export class ChatbotsModule {}
