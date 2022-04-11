import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { delay, of } from 'rxjs';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'ping' })
  ping() {
    return of('pang').pipe(delay(1000));
  }
}
