require('./dbconnection');

const Student = require('./models/Student');

Student.find()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(error);
  });
