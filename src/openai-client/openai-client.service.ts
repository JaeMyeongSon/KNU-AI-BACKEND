import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
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

  async chat(id: string, message: string): Promise<string> {
    try {
      const messages = await this.createMessages(id, message);

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
    id: string,
    message: string,
  ): Promise<OpenaiMessageDto[]> {
    const setupMessages = await this.getSetupMessages(id);

    return [...setupMessages, new OpenaiMessageDto('user', message)];
  }

  private async getSetupMessages(id: string): Promise<OpenaiMessageDto[]> {
    const chatbot = await this.chatbotModel.findById(id);

    return chatbot.setupMessages;
  }
}
