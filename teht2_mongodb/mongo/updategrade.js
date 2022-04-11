/* eslint-disable quote-props */
require('./dbconnection');

const Student = require('./models/Student');

const studentcode = 'a1234';
const coursecode = 'htzz-20056';
const grade = 4;

Student.updateOne(
  {
    studentcode: studentcode,
    'grades.coursecode': coursecode,
  },
  {
    'grades.$.grade': grade,
  }
)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
