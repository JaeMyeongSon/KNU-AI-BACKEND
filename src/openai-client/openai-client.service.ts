import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatbotRole } from './chatbot.role';
import { OpenaiMessageDto } from './dto/openai-message.dto';
import { Chatbot } from '../schemas/chatbot.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OpenaiClientService {
  private readonly openai: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Chatbot.name) private readonly chatbotModel: Model<Chatbot>,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async chat(message: string): Promise<string> {
    try {
      const messages = await this.createMessages(ChatbotRole.Lawyer, message);

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
    role: ChatbotRole,
    message: string,
  ): Promise<OpenaiMessageDto[]> {
    const setupMessages = await this.getSetupMessages(role);

    return [...setupMessages, new OpenaiMessageDto('user', message)];
  }

  private async getSetupMessages(
    role: ChatbotRole,
  ): Promise<OpenaiMessageDto[]> {
    const chatbot = await this.chatbotModel.findOne({ role: role });

    return chatbot.setupMessages;
  }
}
