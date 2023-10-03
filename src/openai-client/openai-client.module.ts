import { Module } from '@nestjs/common';
import { OpenaiClientService } from './openai-client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotSetupMessage } from '../entities/chatbot-setup-message';

@Module({
  imports: [TypeOrmModule.forFeature([ChatbotSetupMessage])],
  providers: [OpenaiClientService],
  exports: [OpenaiClientService],
})
export class OpenaiClientModule {}
