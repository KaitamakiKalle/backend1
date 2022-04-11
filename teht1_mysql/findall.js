const Dbmethods = require('./Dbmethods');

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.findAll((error, result) => {
  if (error) {
    handleError(error);
  } else {
    console.log(result);
  }
});
