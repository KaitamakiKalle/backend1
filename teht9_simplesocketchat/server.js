/*Mahdollisiman yksinkertinen chatti Socket.io:lla
 * Socket.io:n toiminta perustuu eventteihin. Socket
 * perii Noden events.eventEmitter -luokan  joten se
 * voi emittoida eventtejä.
 *
 * Projektiin tarvitsee asentaa vain yksi kirjasto: socket.io
 * Serveri käynnistyy komennolla node server ja clientit ovat
 * osoitteissa http://localhost:3010/client.html
 */

const http = require('http');
const fs = require('fs');
const moniker = require('moniker');

//http-serveri joka laitetaan muuttujaan app servaa sivun client.html
const app = http
  .createServer((req, res) => {
    fs.readFile('client.html', 'utf-8', (error, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  })
  .listen(3010);
console.log('Http server in port 3010');

//Socket-serveri io luodaan ja liitetään http-serveriin app
const io = require('socket.io')(app);

/*'connection'-tapahtuma suoritetaan joka kerta kun joku clientin 
socket ottaa yhteyden serveriin. Parametrina oleva muuttuja socket on 
viittaus clientin socketiin
*/
function addUser() {
  const user = {
    name: moniker.choose(),
  };
  return user;
}

const winNum = Math.floor(Math.random() * 101);

io.sockets.on('connection', (socket) => {
  const user = addUser();
  // console.log(user);
  socket.emit('welcome', user);
  // kun clientilta tulee 'message to server' -tapahtuma saadaan clientilta data
  // data -muuttuja on olio joka sisältää on avain-arvo-pareja, indeksinä avaimet
  socket.on('message_to_server', (data) => {
    const quess = parseInt(data.message);
    if (quess === winNum) {
      io.sockets.emit('message_to_client', {
        message: 'Pelaaja ' + user.name + ' voitti pelin',
      });
    } else if (quess > winNum) {
      io.sockets.emit('message_to_client', { message: 'Numero on pienempi' });
    } else if (quess < winNum) {
      io.sockets.emit('message_to_client', { message: 'Numero on suurempi' });
    }
    // console.log(data);
    // lähetetään tullut data takaisin kaikille clientin socketeille
    // emitoimalla tapahtuma 'message_to_client'.
    io.sockets.emit('message_to_client', {
      message: `Pelaaja ${user.name} arvasi ${data.message}`,
    });
  });
});
