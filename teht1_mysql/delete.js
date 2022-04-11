const Dbmethods = require('./Dbmethods.js');

function handleError(err) {
  console.error(err);
  process.exit(1);
}

const student = 'x1234';

Dbmethods.delGrades(student, (error, result) => {
  if (error) {
    return handleError(error);
  } else {
    console.log(result.affectedRows + ' records deleted');
  }
});

Dbmethods.del(student, (error, result) => {
  if (error) {
    return handleError(error);
  } else {
    console.log(result.affectedRows + ' records deleted');
  }
});
