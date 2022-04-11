const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  // Token saadaan pyynnön x-access-token headerista tai pyynnön bodysta
  const token = req.body.token || req.headers['x-access-token'];
  // Jos tokenia ei ole lähetetään virhe ilmoitus clientille
  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token',
    });
  } else {
    //  Tokeni vahvistetaan verify() metodilla.
    // Token "puretaan" serverin Secretin avulla ja vahvistetaan sen olevan oikea
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.json({
          success: false,
          message: 'Token is not valid or it is expired',
        });
      } else {
        // Jos tokenin vahvistus onnistuu siirrytään seuraavaan middlewareen
        req.decoded = decoded;
        next();
      }
    });
  }
}

module.exports = verifyToken;
