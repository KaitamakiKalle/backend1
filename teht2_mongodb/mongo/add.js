/* eslint-disable new-cap */

//const connection = require('./dbconnection.js');
require('./dbconnection.js');
const StudentModel = require('./models/Student');
const newStudentObj = require('./NewStudentObject');

const newStudent = StudentModel(newStudentObj);

StudentModel.create(newStudent)
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });
