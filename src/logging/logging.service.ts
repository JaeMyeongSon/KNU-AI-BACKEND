import { Injectable, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Logging, LoggingDocument } from 'src/entities/logging';

@Injectable()
export class LoggingService implements LoggerService {
  constructor(
    @InjectModel(Logging.name)
    private loggingModel: PaginateModel<LoggingDocument>,
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
    console.log('TESTBUG');
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

  getLogs({ limit, page }: { limit: number; page: number }) {
    return this.loggingModel.paginate(
      {},
      {
        sort: { timestamp: -1 }, // 최신 순 정렬
        limit, // 개수 제한
        page, // 페이지 번호
        select: 'message timestamp level',
      },
    );
  }
}

enum Level {
  log = '[LOG]',
  error = '[ERROR]',
  warn = '[WARN]',
  debug = '[DEBUG]',
  verbose = '[VERBOSE]',
}
