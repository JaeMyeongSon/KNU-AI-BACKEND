import { Injectable, UnauthorizedException } from '@nestjs/common';

import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, Repository } from 'typeorm';
import { User } from 'src/entities/user';
import { EmailService } from './email.service';
import { Email } from 'src/entities/email';
import { Chat } from '../entities/chat';
import { Premium } from '../entities/premium';

@Injectable()
export class UsersService {
  constructor(
    private readonly emailService: EmailService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Email) private emailRepository: Repository<Email>,
    @InjectRepository(Premium) private premiumRepository: Repository<Premium>,
    private dataSource: DataSource,
  ) {}

  getUser(userId: number) {
    return this.userRepository.findOneBy({ id: userId });
  }

  async createUser(email: string, password: string, verify: number) {
    //user 중복 검사

    if (!(await this.verifyEmail(email, verify))) {
      console.log('이메일 통과 실패');
      throw new UnauthorizedException('이메일 인증번호가 일치하지 않습니다');
    }
    console.log('이메일 인증 통과', verify);
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 이메일입니다.');
    }
    console.log('중복 통과', email);
    const hashedPassword = await bcrypt.hash(password, 12); //비밀번호 암호화
    //유저 생성
    const returnUser = await this.userRepository.save({
      email,
      password: hashedPassword,
    });
    return returnUser;
  }

  async sendEmailVerifiy(email: string) {
    const verifyToken = this.generateRandomNumber();
    console.log('이메일, 토큰: ', email, verifyToken);
    await this.sendVerifyToken(email, verifyToken);
    await this.emailRepository.save({
      email,
      verify: verifyToken,
    });
  }

  getUsedChatCount(userId: number) {
    const now = new Date();
    now.setDate(now.getDate() - 1);

    return this.dataSource
      .createQueryBuilder()
      .select('chat')
      .from(Chat, 'chat')
      .where('chat.isUserMessage = true')
      .andWhere('chat.user_id = :userId', { userId })
      .andWhere('chat.createdAt >= :afterDate', { afterDate: now })
      .getCount();
  }

  existsPremium(userId: number) {
    return this.premiumRepository.exist({
      where: { userId: userId, isExpired: false },
    });
  }

  async enrollPremium(userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const premium = new Premium();

      premium.userId = userId;
      premium.startDate = new Date();

      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      premium.endDate = endDate;

      await queryRunner.manager.save(premium);
      await queryRunner.manager.update(
        User,
        { id: userId },
        { rateLimit: 100 },
      );

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async sendVerifyToken(email: string, verifyToken: number) {
    await this.emailService.sendVerifyToken(email, verifyToken);
  }

  private async verifyEmail(email: string, verifyToken: number) {
    const beforeDate = new Date(Date.now());
    const nowDate = new Date(Date.now());
    beforeDate.setMinutes(beforeDate.getMinutes() - 5);

    console.log(`${beforeDate}, ${nowDate}`);

    return await this.emailRepository.exist({
      where: {
        email: email,
        verify: verifyToken,
        createdAt: Between(beforeDate, nowDate),
      },
    });
  }

  private generateRandomNumber(): number {
    const minm = 100000;
    const maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }
}
