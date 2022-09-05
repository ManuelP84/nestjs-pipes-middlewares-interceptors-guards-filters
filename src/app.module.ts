import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AppController } from './controller/app.controller';
import { AuthGuard } from './guards/auth.guard';
import { LogginInterceptor } from './interceptors/loggin.interceptor';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AppService } from './service/app.service';
import { RequestService } from './service/request.service';
import { Scope } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService, 
    RequestService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LogginInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
  ],
})
export class AppModule implements NestModule {
  // Middleware config
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
