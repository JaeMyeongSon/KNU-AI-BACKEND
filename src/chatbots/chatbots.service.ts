import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chatbot } from '../schemas/chatbot.schema';
import { Model } from 'mongoose';
import { ChatbotDto } from './dto/chatbot.dto';

@Injectable()
export class ChatbotsService {
  constructor(
    @InjectModel(Chatbot.name) private readonly chatbotModel: Model<Chatbot>,
  ) {}

  async getChatbots() {
    const chatbots = await this.chatbotModel.find();

    return chatbots.map((chatbot) => ChatbotDto.fromSchema(chatbot));
  }
}
