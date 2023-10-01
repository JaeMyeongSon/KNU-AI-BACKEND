import { Module } from '@nestjs/common';
import { ChatbotsController } from './chatbots.controller';
import { ChatbotsService } from './chatbots.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chatbot, ChatbotSchema } from '../schemas/chatbot.schema';
import { OpenaiClientModule } from '../openai-client/openai-client.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chatbot.name, schema: ChatbotSchema }]),
    OpenaiClientModule,
  ],
  controllers: [ChatbotsController],
  providers: [ChatbotsService],
})
export class ChatbotsModule {}
