require('./dbconnection');

const Student = require('./models/Student');

const studentcode = 't1234';

Student.deleteOne({ studentcode: studentcode })
  .then((result) => {
    console.log('deleted ' + result.deletedCount + ' student');
  })
  .catch((err) => {
    console.error(err);
  });
