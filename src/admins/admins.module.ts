import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}
