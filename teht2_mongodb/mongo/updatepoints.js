require('./dbconnection');

const Student = require('./models/Student');
const studentcode = 'a1234';
const studypoints = 10;

Student.updateOne(
  { studentcode: studentcode },
  {
    studypoints: studypoints,
  }
)
  .then((result) => {
    console.log('Updated points of ' + result.nModified + ' student');
  })
  .catch((err) => {
    console.error(err);
  });
