import { Module } from '@nestjs/common';
import { OpenaiClientService } from './openai-client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chatbot, ChatbotSchema } from '../schemas/chatbot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chatbot.name, schema: ChatbotSchema }]),
  ],
  providers: [OpenaiClientService],
  exports: [OpenaiClientService],
})
export class OpenaiClientModule {}
