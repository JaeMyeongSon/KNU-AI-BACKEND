import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginReqDto {
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
}
