require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

/* Anonyymi funktio joka hakee käyttäjän Googlen login-applikaatiosta.
Funktio käyttää passport-kirjastoa joten passport-kirjasto tulee funktioon parametrina.
Tämä anonyymi funktio on importattu app.js -tiedostoon jossa se saa parametrikseen passportin.
Funktio ajetaan siis aina kun app.js käynnistyy.
 */
module.exports = function (passport) {
  // passportin login-session vaatii käyttäjän serialisointa (olio merkkijonoksi)
  // passportissa on tähän omat metodit
  // serialisointi
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  // ja deserialisointi
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        // haetaan Googlen login-applikaation data ympäristömuuttujista
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACKURL,
      },
      function (token, refreshToken, profile, done) {
        // funktio ei käynnisty ennen kuin kaikki data on saatu Googlelta
        process.nextTick(function () {
          // Tehdään newUser-olio, jossa on käyttäjän tiedot
          // Täämä olio voitaisiin esim. tallentaa kantaan.
          const newUser = {
            google: {
              id: profile.id,
              token: token, // Googlen access-token joka valtuuttaa pääsyyn hakemaan tiedot Googlelta
              email: profile.emails[0].value,
              name: profile.displayName,
            },
          };

          // palautetaan newUser
          return done(null, newUser);
        });
      }
    )
  );
};
