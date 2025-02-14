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
    required: function() {
      // Make password required only for non-OAuth users
      return !this.isOAuth;
    },
  },
  isOAuth: {
    type: Boolean,
    default: false,
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
