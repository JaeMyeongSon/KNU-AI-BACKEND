import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatbotsService } from './chatbots.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetChatbotRolesSwagger } from './dto/get-chatbot-roles.swagger';
import { OpenaiClientService } from '../openai-client/openai-client.service';
import { CreateMessageResponseSwagger } from './dto/create-message-response.swagger';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';

@ApiTags('Chatbots')
@Controller('api/chatbots')
export class ChatbotsController {
  constructor(
    private readonly chatbotsService: ChatbotsService,
    private readonly openaiClientService: OpenaiClientService,
  ) {}

  @Get('roles')
  @ApiOperation({ summary: '챗봇의 역할 목록을 조회' })
  @ApiOkResponse({
    description: '챗봇의 역할 목록',
    type: GetChatbotRolesSwagger,
  })
  async getChatbotRoles() {
    return await this.chatbotsService.getChatbotRoles();
  }

  @Post('chats')
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
