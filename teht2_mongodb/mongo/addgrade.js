require('./dbconnection');

const Student = require('./models/Student');

const studentcode = 'a1234';
const grade = {
  coursecode: 'htzz-20056',
  grade: 3,
};

Student.updateOne(
  { studentcode: studentcode },
  {
    $push: { grades: grade },
    $inc: { studypoints: grade === 0 ? 0 : 5 },
  }
)
  .then((result) => {
    console.log('Added ' + result.nModified + ' grade to student');
  })
  .catch((err) => {
    console.error(err);
  });
