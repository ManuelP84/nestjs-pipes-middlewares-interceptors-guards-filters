import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import { AppService } from '../service/app.service';
import { LogginInterceptor } from '../interceptors/loggin.interceptor';
import { FreezePipe } from '../pipes/freeze.pipe';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  //@UseInterceptors(LogginInterceptor)   // Its already use it at module level
  getHello(): string {
    this.logger.log('getHello called');
    return this.appService.getHello();
  }

  @Get('error')
  throwError() {
    throw new InternalServerErrorException('Server error. Please check logs!');
  }

  @Post()
  examplePost(@Body(FreezePipe) body: any) {
    body.test = 31;
  }
}
