import { Injectable, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logging } from 'src/entities/logging';

@Injectable()
export class LoggingService implements LoggerService {
  constructor(
    @InjectModel(Logging.name) private loggingModel: Model<Logging>,
  ) {}

  async log(message: any) {
    const createLog = await this.loggingModel.create({
      level: Level.log,
      message: message,
    });
  }

  async error(message: any, ...optionalParams: any[]) {
    const createError = await this.loggingModel.create({
      level: Level.error,
      message: message,
    });
  }

  async warn(message: any, ...optionalParams: any[]) {
    const createWarn = await this.loggingModel.create({
      level: Level.warn,
      message: message,
    });
  }

  async debug(message: any, ...optionalParams: any[]) {
    console.log('this debug');
    const createDebug = await this.loggingModel.create({
      level: Level.debug,
      message: message,
    });
  }

  async verbose(message: any, ...optionalParams: any[]) {
    const createVerbose = await this.loggingModel.create({
      level: Level.verbose,
      message: message,
    });
  }
}

enum Level {
  log = '[LOG]',
  error = '[ERROR]',
  warn = '[WARN]',
  debug = '[DEBUG]',
  verbose = '[VERBOSE]',
}
