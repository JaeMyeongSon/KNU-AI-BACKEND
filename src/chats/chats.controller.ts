import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiClientService } from '../openai-client/openai-client.service';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMessageResponseSwagger } from './dto/create-message-response.swagger';

@ApiTags('Chats')
@Controller('api/chats')
export class ChatsController {
  constructor(private readonly openaiClientService: OpenaiClientService) {}

  @Post('messages')
  @ApiOperation({ summary: '챗봇에게 채팅 메시지 전송' })
  @ApiOkResponse({
    description: '챗봇의 응답 메시지',
    type: CreateMessageResponseSwagger,
  })
  async createMessage(@Body() content: CreateMessageRequestDto) {
    const { role, message } = content;

    return await this.openaiClientService.chat(role, message);
  }
}
