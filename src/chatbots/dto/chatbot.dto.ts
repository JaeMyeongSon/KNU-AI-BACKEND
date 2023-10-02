import { ApiProperty } from '@nestjs/swagger';
import { ChatbotRole } from '../../openai-client/chatbot.role';
import { ChatbotDocument } from '../../schemas/chatbot.schema';

export class ChatbotDto {
  static fromSchema(chatbot: ChatbotDocument) {
    const chatbotDto = new ChatbotDto();

    chatbotDto.id = chatbot.id;
    chatbotDto.name = chatbot.name;
    chatbotDto.role = chatbot.role;

    return chatbotDto;
  }

  @ApiProperty({
    required: true,
    description: '챗봇의 ID',
  })
  id: string;

  @ApiProperty({
    required: true,
    description: '챗봇의 이름',
  })
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    enum: ChatbotRole,
    description: '챗봇의 역할',
  })
  role: string;
}
