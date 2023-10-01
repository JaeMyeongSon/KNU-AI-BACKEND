import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChatbotRole } from '../openai-client/chatbot.role';
import { OpenaiMessageDto } from '../openai-client/dto/openai-message.dto';
import mongoose from 'mongoose';
import { Chatbot } from './chatbot.schema';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User {
  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop(
    required: true,
    unique: true
  ) // MongoDB에 들어갈 설정들을 적어준다.
  userName: string; // 필드 이름: 타입(타입스크립트 타입)

  @Prop(
    required: true
  )
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
