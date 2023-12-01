import { AppService } from 'src/logging/app.service';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('logging')
@Controller('logging')
export class LoggingController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async loggingTest() {
    console.log('로깅 출력 검사 : ');
    this.appService.getHello();
  }
}
