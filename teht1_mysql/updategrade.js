const Dbmethods = require('./Dbmethods');

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.updateGrade('a1234', 'HTK-20002', 4, (error, result) => {
  if (error) {
    return handleError(error);
  } else {
    console.log(result);
  }
});
