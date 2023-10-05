import { ApiProperty } from '@nestjs/swagger';

export class EmailsDto {
  @ApiProperty({
    required: true,
    example: 'user1@naver.com',
    description: '인증할 유저 이메일',
  })
  public email: string;
}
