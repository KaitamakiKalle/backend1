import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  /* 
  @MessagePattern -annotaatio ilmoittaa että viesti jossa
  on tunniste 'get-next-launch-remaining-time', otetaan vastaan. Viestiin
  vastataan lähettämällä servicen tuottama merkkijono, eli aika 
  joka on jäljellä seuraavaan raketin laukaisuun. Client lähettää
  viestin jossa on tunniste ja vastaus lähetetään clientille.
  */
  @MessagePattern('get-next-launch-remaining-time')
  getNextLaunchRemainingTime(): Observable<string> {
    return this.appService.getNextLaunchRemainingTime();
  }
}
