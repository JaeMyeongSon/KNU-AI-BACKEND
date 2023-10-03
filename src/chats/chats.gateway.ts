import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UseFilters } from '@nestjs/common';
import { OpenaiClientService } from '../openai-client/openai-client.service';
import { WsExceptionFilter } from '../exception-filters/ws.exception-filter';
import { CreateMessageRequestDto } from '../chatbots/dto/create-message-request.dto';
import { from, map } from 'rxjs';

@WebSocketGateway(8081)
@UseFilters(WsExceptionFilter)
export class ChatsGateway {
  constructor(private readonly openaiClientService: OpenaiClientService) {}

  @SubscribeMessage('chats/messages')
  async handleMessage(@MessageBody() input: string) {
    const { chatbotId, message } = JSON.parse(input) as CreateMessageRequestDto;
    const resEvent = `chats/messages/${chatbotId}`;

    const stream = await this.openaiClientService.chatWithStream(
      chatbotId,
      message,
    );

    return from(stream).pipe(
      map((part) => ({
        event: resEvent,
        data: part.choices[0]?.delta?.content || '',
      })),
    );
  }
}
