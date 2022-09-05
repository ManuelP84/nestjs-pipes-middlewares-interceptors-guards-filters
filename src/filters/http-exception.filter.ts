import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.log(HttpExceptionFilter.name);

    const context = host.switchToHttp();
    const res = context.getResponse();
    const req = context.getRequest();
    const status = exception.getStatus();

    res.status(status).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
