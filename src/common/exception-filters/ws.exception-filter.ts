import { ArgumentsHost, Catch } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WsExceptionFilter {
  public catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    this.handleError(client, exception);
  }

  public handleError(client: Socket, exception: WsException) {
    client.emit('error', exception.message);
  }
}
