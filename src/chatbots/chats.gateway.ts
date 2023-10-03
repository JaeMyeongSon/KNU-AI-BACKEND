import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { WsExceptionFilter } from '../exception-filters/ws.exception-filter';

@WebSocketGateway(8081)
@UsePipes(ValidationPipe)
@UseFilters(WsExceptionFilter)
export class ChatsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('chats/messages')
  handleMessage(
    @MessageBody() { message, role }: CreateMessageRequestDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(message);
    console.log(role);
    client.emit('message', `server to client ${message}`);
  }
}
