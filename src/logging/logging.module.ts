import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';
import { Logging, LoggingSchema } from 'src/entities/logging';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logging.name, schema: LoggingSchema }]),
  ],
  providers: [LoggingService],
  controllers: [LoggingController],
})
export class LoggingModule {}
