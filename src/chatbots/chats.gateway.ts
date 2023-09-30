import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { WsExceptionFilter } from '../exception-filters/ws.exception-filter';
import { OpenaiClientService } from '../openai-client/openai-client.service';
import { from, map } from 'rxjs';

@WebSocketGateway(8081)
@UsePipes(ValidationPipe)
@UseFilters(WsExceptionFilter)
export class ChatsGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly openaiClientService: OpenaiClientService) {}

  @SubscribeMessage('chats/messages')
  async handleMessage(
    @MessageBody() { message, role }: CreateMessageRequestDto,
  ) {
    const resEvent = `chats/messages/${role}`;
    const stream = await this.openaiClientService.chatWithStream(role, message);

    return from(stream).pipe(
      map((part) => ({
        event: resEvent,
        data: part.choices[0]?.delta?.content || '',
      })),
    );
  }
}
