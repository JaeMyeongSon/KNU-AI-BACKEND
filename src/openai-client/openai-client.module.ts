import { Module } from '@nestjs/common';
import { OpenaiClientService } from './openai-client.service';

@Module({
  providers: [OpenaiClientService],
  exports: [OpenaiClientService],
})
export class OpenaiClientModule {}
