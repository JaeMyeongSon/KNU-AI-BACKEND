import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class PostUserDto {
  @ApiProperty({
    required: true,
    example: 'oys',
    description: '유저 아이디',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    required: true,
    example: '1234',
    description: '비밀번호',
  })
  password: string;
}
