import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  debug(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
}
