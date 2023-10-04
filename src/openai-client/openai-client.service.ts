import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { OpenaiMessageDto } from './dto/openai-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatbotSetupMessage } from '../entities/chatbot-setup-message';
import { OpenaiMessageRole } from './openai-message-role';

@Injectable()
export class OpenaiClientService {
  private readonly openai: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ChatbotSetupMessage)
    private chatbotSetupMessageRepository: Repository<ChatbotSetupMessage>,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async chat(chatbotId: number, message: string): Promise<string> {
    try {
      const messages = await this.createMessages(chatbotId, message);

      const chatCompletion = await this.openai.chat.completions.create({
        messages: messages as any,
        model: this.configService.get('OPENAI_API_MODEL'),
      });

      return chatCompletion.choices[0].message.content;
    } catch (err) {
      if (err.code == 'insufficient_quota') {
        return '사용량을 초과했습니다.';
      }
      console.error(err);

      return err.code;
    }
  }

  private async createMessages(
    chatbotId: number,
    message: string,
  ): Promise<OpenaiMessageDto[]> {
    const setupMessages = await this.getSetupMessages(chatbotId);

    return [
      ...setupMessages,
      new OpenaiMessageDto(OpenaiMessageRole.User, message),
    ];
  }

  private async getSetupMessages(
    chatbotId: number,
  ): Promise<OpenaiMessageDto[]> {
    const setupMessages = await this.chatbotSetupMessageRepository.find({
      where: { chatbotId },
    });

    return setupMessages.map(
      ({ role, message }) => new OpenaiMessageDto(role, message),
    );
  }
}
