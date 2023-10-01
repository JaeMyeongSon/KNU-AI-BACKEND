import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Chatbot } from './chatbot.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Chat {
  @Prop({
    required: true,
  })
  message: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatbot',
  })
  chatbot: Chatbot;

  @Prop({
    required: true,
  })
  isUserMessage: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
