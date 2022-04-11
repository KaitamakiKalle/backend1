const mongoose = require('mongoose');

mongoose
  .connect('mongodb://tunnus1:salasana1@127.0.0.1:27017/tietokanta', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log('Connection to db succesfull');
    return response;
  })
  .catch((error) => {
    console.log('Error when connecting to db');
    console.error(error);
  });
