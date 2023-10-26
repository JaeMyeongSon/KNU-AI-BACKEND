import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { EmailService } from './email.service';
import { Email } from 'src/entities/email';

@Module({
  imports: [TypeOrmModule.forFeature([User, Email])],
  providers: [UsersService, EmailService],
  controllers: [UsersController],
})
export class UsersModule {}
