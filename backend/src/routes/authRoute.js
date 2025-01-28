const express = require("express");
const router = express.Router();
const { registerStudent, registerTutor, loginUser } = require("../controllers/authController"); // Import controller functions

// Route for registering a student
router.post('/register/student', registerStudent);

// Route for registering a tutor
router.post('/register/tutor', registerTutor);

// Route for logging in a user
router.post("/login", loginUser);

module.exports = router;
