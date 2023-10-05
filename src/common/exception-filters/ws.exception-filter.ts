import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Catch(WsException, HttpException)
export class WsExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    this.handleError(client, exception);
  }

  public handleError(client: Socket, exception: HttpException | WsException) {
    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      if (res.hasOwnProperty('message')) {
        client.emit('error', (res as { message: string }).message);
      } else {
        client.emit('error', exception.message);
      }
    } else {
      client.emit('error', exception.message);
    }
  }
}
