import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChatbotDocument, ChatbotSchema } from './chatbot.schema';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Chat {
  @Prop({
    required: true,
  })
  message: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Chatbot',
  })
  chatbotId: Types.ObjectId;

  @Prop({
    required: true,
  })
  isUserMessage: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

ChatbotSchema.virtual('chatbot', {
  ref: 'Chatbot',
  localField: 'chatbotId',
  foreignField: '_id',
  justOne: true,
});

export type ChatDocument = Chat &
  Document & {
    chatbot: ChatbotDocument;
    createdAt: Date;
    updatedAt: Date;
  };
