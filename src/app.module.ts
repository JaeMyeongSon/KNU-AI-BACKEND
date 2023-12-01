import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenaiClientModule } from './openai-client/openai-client.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatbotsModule } from './chatbots/chatbots.module';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat';
import { Chatbot } from './entities/chatbot';
import { ChatbotSetupMessage } from './entities/chatbot-setup-message';
import { ChatsModule } from './chats/chats.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user';
import { Email } from './entities/email';
import { LoggingModule } from './logging/logging.module';
import { AppService } from './logging/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: +process.env.MYSQL_DB_PORT,
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_DATABASE,
      entities: [Chat, Chatbot, ChatbotSetupMessage, User, Email],
      logging: false,
      keepConnectionAlive: true,
      synchronize: true,
      charset: 'utf8mb4',
      timezone: 'Z',
    }),
    OpenaiClientModule,
    ChatbotsModule,
    ChatsModule,
    UsersModule,
    AuthModule,
    LoggingModule,
  ],
})
export class AppModule {}
