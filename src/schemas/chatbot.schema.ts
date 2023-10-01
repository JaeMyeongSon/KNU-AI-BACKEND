import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChatbotRole } from '../openai-client/chatbot.role';
import { OpenaiMessageDto } from '../openai-client/dto/openai-message.dto';

@Schema()
export class Chatbot {
  @Prop({
    required: true,
    unique: true,
    enum: Object.values(ChatbotRole),
  })
  role: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  setupMessages: OpenaiMessageDto[];
}

export const ChatbotSchema = SchemaFactory.createForClass(Chatbot);
