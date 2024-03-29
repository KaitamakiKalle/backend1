const jwt = require('jsonwebtoken');
require('dotenv').config();

// Funktio jolla käyttäjälle luodaan tokeni
function createToken(user) {
  // payloadissa talenttuu tokeniin haluttua tietoa.
  // Tieto voi periaatteessa olla mitä tahansa mutta yleensä siinä viedään
  // esimerkiksi käyttäjän nimi tai id
  const payload = {
    user: user.username,
    isAdmin: user.isadmin,
  };
  // Token luodaan sign() metodilla onka argumenteiksi tulee payload sekä secret
  // Näistä encoodataan tokeni joka tallentuu client puolelle
  const token = jwt.sign(payload, process.env.SECRET);

  return token;
}

module.exports = createToken;
