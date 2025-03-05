const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Student = require("../models/studentModel"); 
const Tutor = require("../models/tutorModel"); 

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // From Google Developer Console
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingStudent = await Student.findOne({ email: profile.emails[0].value });
        const existingTutor = await Tutor.findOne({ email: profile.emails[0].value });

        if (existingStudent) {
          return done(null, existingStudent);
        } else if (existingTutor) {
          return done(null, existingTutor);
        } else {
          // Register new user as a student by default
          const newStudent = new Student({
            email: profile.emails[0].value,
            username: profile.displayName,
            password: "", // No password since it's OAuth
            isOAuth: true,
          });

          
          await newStudent.save();
          console.log("New student created: ", newStudent);
          return done(null, newStudent);
        }
      } catch (error) {
        console.log("Error during Google authentication: ", error);
        return done(error, null);
      }
    }
  )
);

// Store only the user's ID in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});


// Retrieve the full user object from the database
passport.deserializeUser(async (id, done) => {
  const user = await Student.findById(id) || await Tutor.findById(id);
  done(null, user);
});

module.exports = passport;
