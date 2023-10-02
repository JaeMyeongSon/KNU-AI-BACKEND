import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatbotsService } from './chatbots.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpenaiClientService } from '../openai-client/openai-client.service';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';
import { ChatbotDto } from './dto/chatbot.dto';
import { GetChatbotsResponseDto } from './dto/get-chatbots-response.dto';
import { CreateMessageResponseDto } from './dto/create-message-response.dto';
import { ChatDto } from './dto/chat.dto';

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

    return new GetChatbotsResponseDto(chatbots);
  }

  @Post('chats')
  @ApiOperation({ summary: '챗봇에게 채팅 메시지 전송' })
  @ApiOkResponse({
    description: '챗봇의 응답 메시지',
    type: CreateMessageResponseDto,
  })
  async createMessage(@Body() content: CreateMessageRequestDto) {
    const { id: chatbotId, message } = content;
    const userId = 'temp';

    const userChat = ChatDto.createForm({
      chatbotId,
      userId,
      message,
      isUserMessage: true,
    });
    const p1 = this.chatbotsService.saveChat(userChat);

    const reply = await this.openaiClientService.chat(chatbotId, message);

    const chatbotChat = ChatDto.createForm({
      chatbotId,
      userId,
      message: reply,
      isUserMessage: false,
    });
    const p2 = this.chatbotsService.saveChat(chatbotChat);

    await Promise.all([p1, p2]);

    return new CreateMessageResponseDto(reply);
  }
}
