import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../entities/user';

export class UsersDto {
  static fromEntity({ id, email, rateLimit }: User) {
    const userDto = new UsersDto();

    userDto.id = id;
    userDto.email = email;
    userDto.rateLimit = rateLimit;

    return userDto;
  }

  @ApiProperty({
    required: true,
    example: 1,
    description: '유저 id',
  })
  public id: number;

  @ApiProperty({
    required: true,
    example: 'user1@naver.com',
    description: '유저 이메일',
  })
  public email: string;

  @ApiProperty({
    required: true,
    example: '10',
    description: 'rate limit',
  })
  public rateLimit: number;

  @ApiProperty({
    required: true,
    example: '3',
    description: '현재 사용한 채팅 횟수',
  })
  public currentUsedCount: number;
}
