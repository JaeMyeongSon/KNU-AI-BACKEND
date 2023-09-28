import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExampleResponseSwagger } from './common/swagger/example-response.swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: '예시용 api' })
  @ApiResponse({ type: ExampleResponseSwagger })
  getHello(): number {
    return 30;
  }
}
