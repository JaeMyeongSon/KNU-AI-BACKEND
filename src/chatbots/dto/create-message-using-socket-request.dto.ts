import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageUsingSocketRequestDto {
  @ApiProperty({
    required: true,
    type: 'integer',
  })
  chatbotId: number;

  @ApiProperty({
    required: true,
    type: 'integer',
  })
  userId: number;

  @ApiProperty({
    required: true,
    example: '챗봇이 뭐에요.',
    description: '챗봇에게 물어볼 메시지',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
