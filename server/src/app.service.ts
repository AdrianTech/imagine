import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return "Hello, this is app developed by Adrian"
  }
}
