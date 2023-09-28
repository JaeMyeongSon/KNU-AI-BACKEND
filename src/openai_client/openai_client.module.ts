import { Module } from '@nestjs/common';
import { OpenaiClientService } from './openai_client.service';

@Module({
  providers: [OpenaiClientService],
  exports: [OpenaiClientService],
})
export class OpenaiClientModule {}
