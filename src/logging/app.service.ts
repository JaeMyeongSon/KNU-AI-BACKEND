import { Injectable, Logger } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly mylogger = new LoggingService();
  getHello(): string {
    console.log(process.env.NODE_ENV);
    this.logger.error('this is error');
    this.logger.warn('this is warn');
    this.logger.log('this is log');
    this.logger.verbose('this is verbose');
    this.logger.debug('this is debug');
    this.mylogger.error('test');

    return 'Hello World!';
  }
}
