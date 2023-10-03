import { Injectable } from '@nestjs/common';
import { ChatbotDto } from './dto/chatbot.dto';
import { ChatDto } from './dto/chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../entities/chat';
import { DataSource, Repository } from 'typeorm';
import { Chatbot } from '../entities/chatbot';

@Injectable()
export class ChatbotsService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(Chatbot) private chatbotRepository: Repository<Chatbot>,
    private dataSource: DataSource,
  ) {}

  async getChatbots() {
    const chatbots = await this.chatbotRepository.find();

    return chatbots.map((chatbot) => ChatbotDto.fromSchema(chatbot));
  }

  async getChats(chatbotId: number, userId: string, afterDate: Date) {
    const chats = await this.dataSource
      .createQueryBuilder()
      .select('chat')
      .from(Chat, 'chat')
      .where('chat.chatbot_id = :chatbotId', { chatbotId })
      .andWhere('chat.createdAt >= :afterDate', { afterDate })
      .getMany();

    return chats.map((chat) => ChatDto.fromSchema(chat));
  }

  async saveChat(chatbotDto: ChatDto) {
    const chatbot = await this.chatbotRepository.findOneById(
      chatbotDto.chatbotId,
    );

    const chat = new Chat();
    chat.message = chatbotDto.message;
    chat.isUserMessage = chatbotDto.isUserMessage;
    chat.chatbot = chatbot;

    return this.chatRepository.save(chat);
  }
}
