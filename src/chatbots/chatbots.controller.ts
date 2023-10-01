import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatbotsService } from './chatbots.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpenaiClientService } from '../openai-client/openai-client.service';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';
import { ChatbotDto } from './dto/chatbot.dto';

@ApiTags('Chatbots')
@Controller('api/chatbots')
export class ChatbotsController {
  constructor(
    private readonly chatbotsService: ChatbotsService,
    private readonly openaiClientService: OpenaiClientService,
  ) {}

  @Get()
  @ApiOperation({ summary: '챗봇 목록을 조회' })
  @ApiOkResponse({
    description: '챗봇 목록',
    type: [ChatbotDto],
  })
  async getChatbots() {
    const chatbots = await this.chatbotsService.getChatbots();

    return chatbots.map((chatbot) => ChatbotDto.fromSchema(chatbot));
  }

  @Post('chats')
  @ApiOperation({ summary: '챗봇에게 채팅 메시지 전송' })
  @ApiOkResponse({
    description: '챗봇의 응답 메시지',
    type: String,
  })
  async createMessage(@Body() content: CreateMessageRequestDto) {
    const { role, message } = content;

    return await this.openaiClientService.chat(role, message);
  }
}
