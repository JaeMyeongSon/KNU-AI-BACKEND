import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chatbot } from '../schemas/chatbot.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatbotsService {
  constructor(
    @InjectModel(Chatbot.name) private readonly chatbotModel: Model<Chatbot>,
  ) {}

  async getChatbotRoles(): Promise<string[]> {
    const chatbots = await this.chatbotModel.find();

    return chatbots.map((chatbot): string => chatbot.role);
  }
}
