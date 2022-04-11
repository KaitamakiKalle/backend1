const jwt = require('jsonwebtoken');
require('dotenv').config();

// Funktio jolla käyttäjälle luodaan tokeni
function createToken(user) {
  // payloadissa talenttuu tokeniin haluttua tietoa.
  // Tieto voi periaatteessa olla mitä tahansa mutta yleensä siinä viedään
  // esimerkiksi käyttäjän nimi tai id
  const payload = {
    username: user.username,
    isadmin: user.isadmin,
  };
  // Token luodaan sign() metodilla onka argumenteiksi tulee payload sekä secret
  // Näistä encoodataan tokeni joka tallentuu client puolelle
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 60 * 60 * 24, // expiroituu 24 tunnissa
  });

  return token;
}

module.exports = createToken;
