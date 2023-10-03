import { Module } from '@nestjs/common';
import { OpenaiClientModule } from '../openai-client/openai-client.module';
import { ChatsGateway } from './chats.gateway';

@Module({
  imports: [OpenaiClientModule],
  providers: [ChatsGateway],
  exports: [ChatsGateway],
})
export class ChatsModule {}
