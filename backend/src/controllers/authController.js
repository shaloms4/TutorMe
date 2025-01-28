const Student = require('../models/studentModel');
const Tutor = require('../models/tutorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new student
const registerStudent = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({ email, password: hashedPassword, username });
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newTutor = new Tutor({ email, password: hashedPassword, username });
    await newTutor.save();
    res.status(201).send({ message: 'Tutor registered successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error registering tutor', error });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const student = await Student.findOne({ email });
    const tutor = await Tutor.findOne({ email });

    const user = student || tutor; // Either a student or a tutor

    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
};

module.exports = { registerStudent, registerTutor, loginUser };
