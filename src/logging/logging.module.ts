import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';
import { AppService } from 'src/logging/app.service';

@Module({
  providers: [LoggingService, AppService],
  controllers: [LoggingController],
})
export class LoggingModule {}
