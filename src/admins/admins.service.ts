import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async getUserCounts(startDate: Date): Promise<Map<string, number>> {
    const users = await this.dataSource
      .createQueryBuilder()
      .select('user.createdAt')
      .from(User, 'user')
      .where('user.createdAt >= :date', { date: startDate })
      .orderBy('user.createdAt')
      .getMany();

    return users
      .map(
        ({ createdAt: date }) => `${date.getFullYear()}-${date.getMonth() + 1}`,
      )
      .reduce((acc, date) => {
        if (acc.has(date)) {
          acc.set(date, acc.get(date) + 1);
        } else {
          acc.set(date, 1);
        }

        return acc;
      }, new Map());
  }
}
