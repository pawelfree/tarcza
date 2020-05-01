import { Injectable, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
export class HeaderInterceptor implements NestInterceptor {
  constructor(private readonly appService: AppService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const res = context.switchToHttp().getResponse();
    res.header('requestId', this.appService.makeId(12));
    res.header('token', this.appService.getToken());
    return next.handle();
  }
}
