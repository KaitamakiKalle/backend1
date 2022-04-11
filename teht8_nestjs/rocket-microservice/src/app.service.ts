/* Service tuottaa mikropalvelun tarjoaman datan.
Yleensä  mikropalvelut käyttävät tietokantaa, mutta
tässä on yksinkertaistamisen vuoksi haettu dataa vain
web-apista ja muunnettu sitä hieman.
*/

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import * as countdown from 'countdown';

@Injectable()
export class AppService {
  // http-olion avulla voidaan ottaa http-yhteys web-apiin
  constructor(private http: HttpService) {}

  getNextLaunchRemainingTime() {
    // haetaan spacex:n web-apista seuraavan lähdön päivämäärä
    // ja muunnetaan se countdown-metodilla jäljellä olevaksi ajaksi.
    return this.http.get('https://api.spacexdata.com/v4/launches/next').pipe(
      map((response) => response.data),
      map((launch) =>
        countdown(new Date(), new Date(launch.date_utc)).toString(),
      ),
    );
  }
}
