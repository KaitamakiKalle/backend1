import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE-A') private readonly clientServiceA: ClientProxy,
    @Inject('SERVICE-B') private readonly clientServiceB: ClientProxy,
    @Inject('ROCKET-SERVICE') private readonly clientRocketService: ClientProxy,
    @Inject('SUM-SERVICE') private readonly clientSumService: ClientProxy,
  ) {}

  pingServiceA() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }
  pingServiceB() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceB
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }
  getRemainingTimeToRocketLaunch() {
    const message = 'get-next-launch-remaining-time';
    const payload = {};
    return this.clientRocketService
      .send<string>(message, payload)
      .pipe(map((message: string) => ({ message })));
  }
  accumulate() {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return this.clientSumService.send<number>(pattern, payload);
  }
}
