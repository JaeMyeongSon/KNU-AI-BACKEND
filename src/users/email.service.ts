import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  // nodemailer에서 제공하는 Transporter 객체 생성
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendVerifyToken(email: string, verifyToken: number) {
    const mailOptions: EmailOptions = {
      to: email,
      subject: '[' + process.env.APP_NAME + '] 이메일 인증 메일입니다',
      html: `인증번호: ${verifyToken}`,
    };
    // transporter 객체를 이용해 메일 전송
    return await this.transporter.sendMail(mailOptions);
  }
}
