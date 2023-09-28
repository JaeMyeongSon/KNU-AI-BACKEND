import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { BaseResponseSwagger } from '../common/swagger/base-response.swagger';

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(
        (data): BaseResponseSwagger => ({
          data: data === undefined ? null : data,
        }),
      ),
    );
  }
}
