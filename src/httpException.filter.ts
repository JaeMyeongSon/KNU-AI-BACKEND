import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | { message: any; statusCode: number; error: number }
      | { error: number; statusCode: 400; message: string[] }; // class-validator 타이핑

    this.logger.debug('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    this.logger.debug('status :', status);
    this.logger.debug('###########################################');
    this.logger.debug('err :', err);

    if (typeof err !== 'string' && err.statusCode === 400) {
      // class-validator 에러
      return response.status(status).json({
        error: err.error,
        errorMessage: err.message,
      });
    }
    response.status(status).json({
      error: err.error,
      errorMessage: err.message,
    });
  }
}
