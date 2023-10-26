import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { EmailService } from './email.service';
import { Email } from 'src/entities/email';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import type { ClientOpts } from 'redis';

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      store: redisStore,
      host: process.env.HOST,
      port: process.env.REDIS_PORT,
      ttl: 300, //유효시간 5분
    }),
    TypeOrmModule.forFeature([User, Email]),
  ],
  providers: [UsersService, EmailService],
  controllers: [UsersController],
})
export class UsersModule {}
