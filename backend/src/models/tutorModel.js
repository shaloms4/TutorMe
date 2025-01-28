const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['tutor'],
    default: 'tutor',
  },
  qualifications: {
    type: String,
    required: false, // Optional field
  },
  bio: {
    type: String,
    required: false, // Optional field
  },
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
