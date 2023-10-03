import { ApiProperty } from '@nestjs/swagger';
import { ChatbotRole } from '../chatbot.role';
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
    enum: ChatbotRole,
    example: ChatbotRole.Lawyer,
    description: '챗봇의 역할',
  })
  role: string;
}
