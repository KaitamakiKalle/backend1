const User = require('../models/User');
const bcrypt = require('bcrypt');
const createToken = require('../createToken.js');
const usercontroller = {
  registerUser: (req, res, next) => {
    // Salasana pitää kryptata ennen kantaan laitamista
    /* hashSync metodi kryptaa salasanan ja lisää siihen "saltin" joka mahdollistaa
     sen ettei samanlaisia kryptattyja salasanoja synny vaikka kahdella käyttäjällä
    olisi sama salasana */
    const hashedPass = bcrypt.hashSync(req.body.password, 10);

    // Laitetaan uusi käyttäjä kantaan
    User.create({
      username: req.body.username,
      password: hashedPass,
      isadmin: req.body.isadmin,
    })
      .then((response) => {
        console.log('Lisättiin käyttäjä onnistuneesti');
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  },

  // Käyttäjän autentikaatio
  authenticateUser: (req, res, next) => {
    // Etsitään käyttäjä kannasta
    User.findOne({ username: req.body.username })
      .then((response) => {
        console.log(response);
        // Jos käyttäjää ei löydy heitetään virhe clientille
        if (!response) {
          res.status(400).send('Käyttäjää ei ole');
          throw new Error('Käytäjää ei ole');
        } else {
          // Jos käyttäjä löytyy Verrataan annettua salasanaa kannassa olevaan salasanaan
          // Koska kannassa oleva salasana on kryptatu vertailu hoidetaan bcryppt kirjaston comareSync() metodilla
          // Metodi vertaa annettua salasana kannassa olevaan
          if (!bcrypt.compareSync(req.body.password, response.password)) {
            res.json({
              success: false,
              message: 'Wrong password',
            });
          } else {
            // Jos kirjautuminen onnistuu luodaan käyttäjälle tokeni
            const token = createToken(req.body);
            res.send({
              success: true,
              message: 'Token created',
              token: token,
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  },
};

module.exports = usercontroller;
