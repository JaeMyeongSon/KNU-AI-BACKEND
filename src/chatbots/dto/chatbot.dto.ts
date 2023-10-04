import { ApiProperty } from '@nestjs/swagger';
import { Chatbot } from '../../entities/chatbot';

export class ChatbotDto {
  static fromSchema(chatbot: Chatbot) {
    const chatbotDto = new ChatbotDto();

    chatbotDto.id = chatbot.id;
    chatbotDto.name = chatbot.name;
    chatbotDto.role = chatbot.role;

    return chatbotDto;
  }

  @ApiProperty({
    required: true,
    example: 1,
    description: '챗봇의 ID',
  })
  id: number;

  @ApiProperty({
    required: true,
    example: '변호사',
    description: '챗봇의 이름',
  })
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'lawyer',
    description: '챗봇의 역할',
  })
  role: string;
}
