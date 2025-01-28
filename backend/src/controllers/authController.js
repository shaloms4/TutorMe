const Student = require('../models/studentModel');
const Tutor = require('../models/tutorModel');

// Register a new student
const registerStudent = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const newStudent = new Student({ email, password, username });
    await newStudent.save();
    res.status(201).send({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error registering student', error });
  }
};

// Register a new tutor
const registerTutor = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const newTutor = new Tutor({ email, password, username });
    await newTutor.save();
    res.status(201).send({ message: 'Tutor registered successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error registering tutor', error });
  }
};

// Login user (basic example)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Simple authentication for demo purposes
  const student = await Student.findOne({ email, password });
  const tutor = await Tutor.findOne({ email, password });

  if (student) {
    return res.status(200).send({ message: 'Student logged in successfully' });
  } else if (tutor) {
    return res.status(200).send({ message: 'Tutor logged in successfully' });
  } else {
    return res.status(400).send({ message: 'Invalid credentials' });
  }
};

module.exports = { registerStudent, registerTutor, loginUser };
