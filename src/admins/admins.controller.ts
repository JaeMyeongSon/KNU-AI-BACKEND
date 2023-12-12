import { Controller, Get, Query } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { ApiTags } from '@nestjs/swagger';
import { LoggingService } from '../logging/logging.service';
import { GetLogsRequestDto } from './dto/getLogsRequest.dto';

@ApiTags('Admins')
@Controller('api/admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get('users/count')
  async getUserCounts() {
    const dateOneYearAgo = new Date();
    dateOneYearAgo.setMonth(dateOneYearAgo.getMonth() - 11);
    const firstDayOfOneYearAgo = new Date(
      dateOneYearAgo.getFullYear(),
      dateOneYearAgo.getMonth(),
      1,
    );

    const userCounts =
      await this.adminsService.getUserCounts(firstDayOfOneYearAgo);

    userCounts.entries();

    const result = [];
    for (const [date, count] of userCounts) {
      result.push({ date, count });
    }

    return result;
  }

  @Get('premium')
  getPremiumInfo() {
    return this.adminsService.getPremiumInfo();
  }

  @Get('logs')
  getLogs(@Query() req: GetLogsRequestDto) {
    return this.loggingService.getLogs(req);
  }
}
