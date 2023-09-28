import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenaiClientService {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async chat(message: string): Promise<string> {
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        messages: this.createMessages(message) as any,
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

  private createMessages(message: string) {
    return [{ role: 'user', content: message }];
  }
}
