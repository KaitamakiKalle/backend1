import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE-A',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8888,
        },
      },
      {
        name: 'SERVICE-B',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8889,
        },
      },
      {
        name: 'ROCKET-SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8877,
        },
      },
      {
        name: 'SUM-SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8886,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
