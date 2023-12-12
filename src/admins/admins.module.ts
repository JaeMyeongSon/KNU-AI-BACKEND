import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user';
import { Premium } from '../entities/premium';
import { LoggingModule } from '../logging/logging.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Premium]), LoggingModule],
  providers: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}
