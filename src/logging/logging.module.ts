import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';
import { AppService } from 'src/logging/app.service';
import { Logging, LoggingSchema } from 'src/entities/logging';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logging.name, schema: LoggingSchema }]),
  ],
  providers: [LoggingService, AppService],
  controllers: [LoggingController],
})
export class LoggingModule {}
