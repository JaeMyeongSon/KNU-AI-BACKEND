import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/entities/user';
import { EmailService } from './email.service';
import { Email } from 'src/entities/email';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly emailService: EmailService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Email) private emailRepository: Repository<Email>,
    private dataSource: DataSource,
  ) {}

  async getOneUser(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
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
    if (verifyToken) {
      await this.cacheManager.get(`${email}'s AuthenticationCode`);
    }
    await this.cacheManager.set(`${email}'s AuthenticationCode`, verifyToken);
    await this.sendVerifyToken(email, verifyToken);
  }

  private async sendVerifyToken(email: string, verifyToken: number) {
    await this.emailService.sendVerifyToken(email, verifyToken);
  }

  private async verifyEmail(email: string, verifyToken: number) {
    const cache_verifyToken = await this.cacheManager.get(
      `${email}'s AuthenticationCode`,
    );
    console.log(verifyToken);
    console.log(cache_verifyToken);
    return cache_verifyToken == verifyToken;
  }

  private generateRandomNumber(): number {
    const minm = 100000;
    const maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }
}
