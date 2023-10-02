import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chatbot } from '../schemas/chatbot.schema';
import { Model } from 'mongoose';
import { ChatbotDto } from './dto/chatbot.dto';
import { Chat } from '../schemas/chat.schema';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatbotsService {
  constructor(
    @InjectModel(Chatbot.name) private readonly chatbotModel: Model<Chatbot>,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
  ) {}

  async getChatbots() {
    const chatbots = await this.chatbotModel.find();

    return chatbots.map((chatbot) => ChatbotDto.fromSchema(chatbot));
  }

  async getChats(chatbotId: string, userId: string) {
    const chats = await this.chatModel.find({ chatbotId });
  }

  async saveChat(chatbotDto: ChatDto) {
    const createdChat = new this.chatModel(chatbotDto);
    return createdChat.save();
  }
}
