import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ChatbotRole } from '../../openai-client/chatbot.role';

export class CreateMessageRequestDto {
  @ApiProperty({
    required: true,
    example: '챗봇이 뭐에요.',
    description: '챗봇에게 물어볼 메시지',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    required: true,
    enum: ChatbotRole,
  })
  @IsEnum(ChatbotRole)
  role: ChatbotRole;
}
