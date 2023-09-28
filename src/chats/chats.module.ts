import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { OpenaiClientModule } from '../openai-client/openai-client.module';

@Module({
  imports: [OpenaiClientModule],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
