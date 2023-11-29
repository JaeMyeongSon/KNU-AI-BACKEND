import { Injectable } from '@nestjs/common';
import { ChatbotDto } from './dto/chatbot.dto';
import { ChatDto } from './dto/chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../entities/chat';
import { DataSource, Repository } from 'typeorm';
import { Chatbot } from '../entities/chatbot';
import { User } from '../entities/user';

@Injectable()
export class ChatbotsService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(Chatbot) private chatbotRepository: Repository<Chatbot>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async getChatbots() {
    const chatbots = await this.chatbotRepository.find();

    return chatbots.map((chatbot) => ChatbotDto.fromSchema(chatbot));
  }

  async getChats(chatbotId: number, userId: number, afterDate: Date) {
    const chats = await this.dataSource
      .createQueryBuilder()
      .select('chat')
      .from(Chat, 'chat')
      .where('chat.chatbot_id = :chatbotId', { chatbotId })
      .andWhere('chat.user_id = :userId', { userId })
      .andWhere('chat.createdAt >= :afterDate', { afterDate })
      .getMany();

    return chats.map((chat) => ChatDto.fromSchema(chat));
  }

  async saveChat({ chatbotId, userId, message, isUserMessage }: ChatDto) {
    const chat = new Chat();

    chat.chatbotId = chatbotId;
    chat.userId = userId;
    chat.message = message;
    chat.isUserMessage = isUserMessage;

    return this.chatRepository.save(chat);
  }

  async isExceedRateLimit(userId: number) {
    const user = await this.userRepository.findOneById(userId);

    const now = new Date();
    now.setDate(now.getDate() - 1);

    const chatsCount = await this.dataSource
      .createQueryBuilder()
      .select('chat')
      .from(Chat, 'chat')
      .where('chat.isUserMessage = true')
      .andWhere('chat.user_id = :userId', { userId })
      .andWhere('chat.createdAt >= :afterDate', { afterDate: now })
      .getCount();

    return chatsCount >= user.rateLimit;
  }
}
