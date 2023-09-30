import { Controller, Get } from '@nestjs/common';
import { ChatbotsService } from './chatbots.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetChatbotRolesSwagger } from './dto/get-chatbot-roles.swagger';

@ApiTags('Chatbots')
@Controller('api/chatbots')
export class ChatbotsController {
  constructor(private readonly chatbotsService: ChatbotsService) {}

  @Get('roles')
  @ApiOperation({ summary: '챗봇의 역할 목록을 조회' })
  @ApiOkResponse({
    description: '챗봇의 역할 목록',
    type: GetChatbotRolesSwagger,
  })
  async getChatbotRoles() {
    return await this.chatbotsService.getChatbotRoles();
  }
}
