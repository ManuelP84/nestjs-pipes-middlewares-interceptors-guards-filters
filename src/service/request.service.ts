import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST }) //Scope: Specifies the lifetime of an injected Provider or Controller.
export class RequestService {
  private userId: string;

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }
}
