import { Module } from '@nestjs/common';
import { ChatbotsController } from './chatbots.controller';
import { ChatbotsService } from './chatbots.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chatbot, ChatbotSchema } from '../schemas/chatbot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chatbot.name, schema: ChatbotSchema }]),
  ],
  controllers: [ChatbotsController],
  providers: [ChatbotsService],
})
export class ChatbotsModule {}
