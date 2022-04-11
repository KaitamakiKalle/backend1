/*
Yksinkertainen mikropalvelu, joka hakee web-API:n kautta avaruusraketin seuraavan lähtöajan
ja muuntaa sen ajaksi joka on jäljellä seuraavaan raketin lähtöön. Tämä mikropalvelu on
pelkkä demo ja oikeasti koko homman voisi tehdä frontendissä. Mutta demo havainnollistaa
Nestjs-mikropalvelun perusrakennetta.

Perustuu tutoriaaliin: https://www.merixstudio.com/blog/microservice-nestjs/
*/
// Nest-mikropalvelu luodaan @nestjs/microservices -kirjastomoduulin avulla
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  /*
    createMicroservice-metodin argumenttina olevassa oliossa ovat
    mikropalvelun asetukset. Transport on enum-tyyppinen "vakiolista",
    joka sisältää Nest-mikropalveluiden mahdolliset tiedonsiirtomenetelmät.
    Tiedon siirto tehdään tässä TCP-protokollalla. Mikropalvelu syntyy 
    porttiin 8877, eli sen kanssa kommunikoidaan tämän portin kautta. 
  */
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8877,
    },
  });
  app.listen();
  console.log('Microservice is listening on port 8877');
}
bootstrap();
