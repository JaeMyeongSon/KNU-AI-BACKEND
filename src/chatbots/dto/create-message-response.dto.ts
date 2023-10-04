import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageResponseDto {
  constructor(reply: string) {
    this.reply = reply;
  }

  @ApiProperty({
    required: true,
    example: '변호사는 변호사입니다.',
    description: '챗봇의 응답 메시지',
  })
  reply: string;
}
