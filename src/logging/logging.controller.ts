import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggingService } from './logging.service';

@ApiTags('logging')
@Controller('logging')
export class LoggingController {
  constructor(private readonly mylogger: LoggingService) {}

  @Get()
  async loggingTest() {
    this.mylogger.error('this is error테스트입니다');
    this.mylogger.log('this is log테스트입니다');
    this.mylogger.debug('debug 로그 테스트');
    this.mylogger.warn('warn 테스트');
    this.mylogger.verbose('verbos 테스트');
    // this.appService.getHello();
  }
}
