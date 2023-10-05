import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UseFilters } from '@nestjs/common';
import { OpenaiClientService } from '../openai-client/openai-client.service';
import { WsExceptionFilter } from '../common/exception-filters/ws.exception-filter';
import { from, map, reduce } from 'rxjs';
import { ChatDto } from '../chatbots/dto/chat.dto';
import { ChatbotsService } from '../chatbots/chatbots.service';
import { Socket } from 'socket.io';
import { CreateMessageUsingSocketRequestDto } from '../chatbots/dto/create-message-using-socket-request.dto';

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
    const { chatbotId, userId, message } = JSON.parse(
      input,
    ) as CreateMessageUsingSocketRequestDto;
    const resEvent = `chats/messages/${chatbotId}`;

    const userChat = ChatDto.createForm({
      chatbotId,
      userId,
      message,
      isUserMessage: true,
    });

    const [_, stream] = await Promise.all([
      this.chatbotsService.saveChat(userChat),
      this.openaiClientService.chatWithStream(chatbotId, message),
    ]);

    return from(stream).pipe(
      map((part) => {
        const data = part.choices[0]?.delta?.content || '';
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
