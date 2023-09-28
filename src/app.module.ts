import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenaiClientModule } from './openai_client/openai_client.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), OpenaiClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
