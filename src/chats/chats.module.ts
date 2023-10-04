import { Module } from '@nestjs/common';
import { OpenaiClientModule } from '../openai-client/openai-client.module';
import { ChatsGateway } from './chats.gateway';
import { ChatbotsModule } from '../chatbots/chatbots.module';

@Module({
  imports: [OpenaiClientModule, ChatbotsModule],
  providers: [ChatsGateway],
  exports: [ChatsGateway],
})
export class ChatsModule {}
