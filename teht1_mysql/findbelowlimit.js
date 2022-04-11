const Dbmethods = require('./Dbmethods.js');

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.findBelowLimit(100, (error, result) => {
  if (error) {
    return handleError(error);
  } else {
    console.log(result);
  }
});
