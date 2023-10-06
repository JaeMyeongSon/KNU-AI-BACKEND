import { Injectable, UnauthorizedException } from '@nestjs/common';

import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from 'src/entities/user';
import { EmailService } from './email.service';
import { Email } from 'src/entities/email';

@Injectable()
export class UsersService {
  constructor(
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
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 이메일입니다.');
    }
    console.log('중복 통과', email);

    if (!this.verifyEmail(email, verify)) {
      console.log('이메일 통과 실패');
      throw new UnauthorizedException('이메일 인증번호가 일치하지 않습니다');
    }
    console.log('이메일 인증 통과', verify);

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
    const token = await this.emailRepository.save({
      email,
      verify: verifyToken,
    });
  }

  async sendVerifyToken(email: string, verifyToken: number) {
    await this.emailService.sendVerifyToken(email, verifyToken);
  }

  async verifyEmail(email: string, verifyToken: number) {
    console.log('verifyEmail: ', email, verifyToken);

    const nowTime = new Date(Date.now());
    console.log('회원가입 시각 : ', nowTime);
    nowTime.setMinutes(nowTime.getMinutes() - 5);

    console.log('회원가입 시각 : ', nowTime);
    const emailToken = await this.dataSource
      .createQueryBuilder()
      .select('email')
      .from(Email, 'email')
      .where('email.email = :email', { email })
      //.andWhere('email.verify = :verifyToken', { verifyToken })
      .andWhere('email.createdAt >= :nowTime', { nowTime })
      .orderBy('email.createdAt', 'DESC')
      .getOne(); //첫번째만 호출됨

    if (!emailToken) {
      throw new UnauthorizedException(
        '이메일 인증버튼을 누르지 않았거나 이메일 인증시간이 만료되었습니다',
      );
    }
    console.log('최종 하나만 출력', emailToken);

    if (Number(emailToken.verify) == verifyToken) {
      console.log('성공');
      return true;
    } else {
      console.log('실패');
      return false;
    }
  }

  private generateRandomNumber(): number {
    const minm = 100000;
    const maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }
}
