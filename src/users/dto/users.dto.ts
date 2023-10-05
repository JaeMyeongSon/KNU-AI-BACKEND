import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../entities/user';

export class UsersDto {
  static fromEntity({ id, email }: User) {
    const userDto = new UsersDto();

    userDto.id = id;
    userDto.email = email;

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
}
