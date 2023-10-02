import { ApiProperty } from '@nestjs/swagger';
import { ChatDto } from './chat.dto';

export class GetChatsResponseDto {
  constructor(chats: ChatDto[]) {
    this.chats = chats;
  }

  @ApiProperty({
    required: true,
    type: [ChatDto],
    description: '채팅 목록',
  })
  chats: ChatDto[];
}
