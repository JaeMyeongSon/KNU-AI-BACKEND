import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { EmailService } from './email.service';
import { Email } from 'src/entities/email';
import { Premium } from '../entities/premium';

@Module({
  imports: [TypeOrmModule.forFeature([User, Email, Premium])],
  providers: [UsersService, EmailService],
  controllers: [UsersController],
})
export class UsersModule {}
