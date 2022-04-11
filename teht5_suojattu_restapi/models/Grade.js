const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  coursecode: {
    type: String,
    maxLength: 15,
    required: true,
  },
  grade: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
});

module.exports = GradeSchema;
