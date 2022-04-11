const Dbmethods = require('./Dbmethods.js');
const connection = require('./dbconnection.js');

const student = 'a1234';
const grade = 3;
const coursecode = '2300-zxs';
const points = 5;
if (grade > 0) {
  connection.beginTransaction(function (err) {
    if (err) {
      throw err;
    }
    Dbmethods.addGrade(
      student,
      coursecode,
      grade,
      function (error, results, fields) {
        if (error) {
          return connection.rollback(function () {
            throw error;
          });
        }

        Dbmethods.addPoints(student, points, function (error, results, fields) {
          if (error) {
            return connection.rollback(function () {
              throw error;
            });
          }
          connection.commit(function (err) {
            if (err) {
              return connection.rollback(function () {
                throw err;
              });
            }
            console.log('success!');
          });
        });
      }
    );
  });
} else {
  Dbmethods.addGrade(
    student,
    grade,
    coursecode,
    function (error, results, fields) {
      if (error) {
        return connection.rollback(function () {
          throw error;
        });
      }
    }
  );
}
