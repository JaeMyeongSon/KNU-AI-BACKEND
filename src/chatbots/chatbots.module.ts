import { Module } from '@nestjs/common';
import { ChatbotsController } from './chatbots.controller';
import { ChatbotsService } from './chatbots.service';
import { OpenaiClientModule } from '../openai-client/openai-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chatbot } from '../entities/chatbot';
import { Chat } from '../entities/chat';
import { User } from '../entities/user';
import { LoggingModule } from '../logging/logging.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Chatbot, User]),
    OpenaiClientModule,
    LoggingModule,
  ],
  controllers: [ChatbotsController],
  providers: [ChatbotsService],
  exports: [ChatbotsService],
})
export class ChatbotsModule {}
