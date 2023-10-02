import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenaiClientModule } from './openai-client/openai-client.module';
import { ChatsModule } from './chats/chats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatbotsModule } from './chatbots/chatbots.module';
import * as process from 'process';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL), //mongoDB
    OpenaiClientModule,
    ChatsModule,
    ChatbotsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
