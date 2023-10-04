import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = await super.canActivate(context);
    if (can) {
      const request = context.switchToHttp().getRequest();
      console.log('login for cookie');
      await super.logIn(request);
    }

    return true; // can Act가 true인 경우 true반환-> 다음으로 넘어가짐
  }
}
