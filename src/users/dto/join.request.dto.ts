import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class JoinRequestDto {
  @ApiProperty({
    required: true,
    example: 'user1@naver.com',
    description: '유저 이메일',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    required: true,
    example: '1234',
    description: '비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  public password: string;

  @ApiProperty({
    required: true,
    example: 123456,
    description: '이메일로 수신한 인증번호',
  })
  @IsNotEmpty()
  @IsNumber()
  public verify: number;
}
