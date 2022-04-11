const mongoose = require('mongoose');
const GradeSchema = require('./Grade.js');
const StudentSchema = new mongoose.Schema({
  studentcode: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z]{1}[0-9]{4}/,
  },
  name: {
    type: String,
    required: true,
    maxLength: 45,
  },
  email: {
    type: String,
    // email standardi säännöllinen lauseke haettu internetistä validointia varten
    match:
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    maxLength: 50,
    required: true,
  },
  studypoints: {
    type: Number,
    min: 0,
  },
  grades: {
    type: [GradeSchema],
  },
});

module.exports = mongoose.model('students', StudentSchema);
