const Dbmethods = require('./Dbmethods');

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.updatePoints('a1234', 130, (error, result) => {
  if (error) {
    return handleError(error);
  } else {
    console.log(result);
  }
});
