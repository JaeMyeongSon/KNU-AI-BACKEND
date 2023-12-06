import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user';
import { Premium } from '../entities/premium';

@Module({
  imports: [TypeOrmModule.forFeature([User, Premium])],
  providers: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}
