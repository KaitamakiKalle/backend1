require('./dbconnection');

const Student = require('./models/Student');

const pointLimit = 100;

Student.find({ studypoints: { $lt: pointLimit } })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
