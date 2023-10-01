import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chatbot } from '../schemas/chatbot.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatbotsService {
  constructor(
    @InjectModel(Chatbot.name) private readonly chatbotModel: Model<Chatbot>,
  ) {}

  getChatbots() {
    return this.chatbotModel.find();
  }
}
