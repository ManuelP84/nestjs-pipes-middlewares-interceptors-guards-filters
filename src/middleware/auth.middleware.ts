import { NestMiddleware, Logger, Injectable } from '@nestjs/common';
import { NextFunction } from 'express';
import { RequestService } from '../service/request.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly requestService: RequestService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(AuthMiddleware.name);

    // Authencication
    const userId = '123';
    this.requestService.setUserId(userId);

    next();
  }
}
