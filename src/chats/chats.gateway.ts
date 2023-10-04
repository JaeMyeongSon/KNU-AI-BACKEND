import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UseFilters } from '@nestjs/common';
import { OpenaiClientService } from '../openai-client/openai-client.service';
import { WsExceptionFilter } from '../exception-filters/ws.exception-filter';
import { CreateMessageRequestDto } from '../chatbots/dto/create-message-request.dto';
import { from, map, reduce } from 'rxjs';
import { ChatDto } from '../chatbots/dto/chat.dto';
import { ChatbotsService } from '../chatbots/chatbots.service';
import { Socket } from 'socket.io';

@WebSocketGateway(8081)
@UseFilters(WsExceptionFilter)
export class ChatsGateway {
  constructor(
    private readonly openaiClientService: OpenaiClientService,
    private readonly chatbotsService: ChatbotsService,
  ) {}

  @SubscribeMessage('chats/messages')
  async handleMessage(
    @MessageBody() input: string,
    @ConnectedSocket() client: Socket,
  ) {
    const { chatbotId, message } = JSON.parse(input) as CreateMessageRequestDto;
    const resEvent = `chats/messages/${chatbotId}`;
    const userId = 1;

    const userChat = ChatDto.createForm({
      chatbotId,
      userId,
      message,
      isUserMessage: true,
    });
    this.chatbotsService.saveChat(userChat);

    const stream = await this.openaiClientService.chatWithStream(
      chatbotId,
      message,
    );

    return from(stream).pipe(
      map((part) => {
        const data = part.choices[0]?.delta?.content || '';
        console.log(data);
        this.sendChunkToClient(client, resEvent, data);
        return data;
      }),
      reduce((acc: string, data: string) => acc + data, ''),
      map((resMessage) => {
        const chatbotChat = ChatDto.createForm({
          chatbotId,
          userId,
          message: resMessage,
          isUserMessage: false,
        });
        this.chatbotsService.saveChat(chatbotChat);
      }),
    );
  }

  private sendChunkToClient(client: Socket, event: string, chunk: string) {
    client.emit(event, chunk);
  }
}
