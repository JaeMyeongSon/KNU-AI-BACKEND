import { Controller, Get } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admins')
@Controller('api/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

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

    console.log(result);

    return result;
  }
}
