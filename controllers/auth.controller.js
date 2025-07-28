const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
// Assuming you have passport and passport-google-oauth20 set up for Google Auth
// const passport = require('passport');

// User Registration
const register = async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).send({ message: 'User was registered successfully!' });
  } catch (error) {
    // Check for unique constraint error (email)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send({ message: 'Email already exists.' });
    }
    res.status(500).send({ message: error.message });
  }
};

// User Login
const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = await user.comparePassword(req.body.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user.id,
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Google Auth - Initiate
// const googleAuth = (req, res, next) => {
//   passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
// };

// Google Auth - Callback
// const googleAuthCallback = (req, res, next) => {
//   passport.authenticate('google', { failureRedirect: '/login' }, (err, user, info) => {
//     if (err) {
//       return res.status(500).send({ message: err.message });
//     }
//     if (!user) {
//       return res.status(401).send({ message: 'Google authentication failed.' });
//     }
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: 86400, // 24 hours
//     });
//     res.status(200).send({
//       id: user.id,
//       email: user.email,
//       accessToken: token,
//     });
//   })(req, res, next);
// };

module.exports = { register, login /*, googleAuth, googleAuthCallback*/ };