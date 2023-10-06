import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailsDto {
  @ApiProperty({
    required: true,
    example: 'user1@naver.com',
    description: '인증할 유저 이메일',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
