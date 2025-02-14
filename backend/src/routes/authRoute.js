const express = require("express");
const passport = require("passport"); // Import passport
const router = express.Router();
const { registerStudent, registerTutor, loginUser } = require("../controllers/authController"); // Import controller functions

// Route for registering a student
router.post('/register/student', registerStudent);

// Route for registering a tutor
router.post('/register/tutor', registerTutor);

// Route for logging in a user
router.post("/login", loginUser);

// Google OAuth authentication
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard"); // Redirect after successful login
  }
);
module.exports = router;