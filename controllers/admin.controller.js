const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
// Assuming you have a service for sending emails (e.g., using Nodemailer or SendGrid)
const emailService = require('../services/email.service'); // Assuming you'll create an email service
const crypto = require('crypto');

// Admin Registration (consider making this an internal or protected endpoint)
const registerAdmin = async (req, res) => {
  try {
    // In a real application, you would likely have a more secure way to create initial admin users
    const admin = await Admin.create({
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).send({ message: 'Admin was registered successfully!' });
  } catch (error) {
     // Check for unique constraint error (email)
     if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send({ message: 'Email already exists.' });
    }
    res.status(500).send({ message: error.message });
  }
};

// Admin Login (Email/Password - initiates OTP)
const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ where: { email: req.body.email } });

    if (!admin) {
      return res.status(404).send({ message: 'Admin Not found.' });
    }

    const passwordIsValid = await admin.comparePassword(req.body.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    // Generate and send OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    admin.otp = otp;
    admin.otpExpires = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes
    await admin.save(); // Use save() to update the existing record

    // Send OTP to admin.email
    await emailService.sendOtpEmail(admin.email, otp);

    res.status(200).send({ message: 'OTP sent to your email.' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Admin OTP Verification
const verifyAdminOtp = async (req, res) => {
  try {
    const admin = await Admin.findOne({ where: { email: req.body.email, otp: req.body.otp } });

    if (!admin || !admin.otpExpires || admin.otpExpires < new Date()) {
      return res.status(400).send({ message: 'Invalid or expired OTP.' });
    }

    // Clear OTP fields after successful verification
    admin.otp = null; // Use null to clear the field
    admin.otpExpires = null; // Use null to clear the field
    await admin.save();

    // Generate JWT for admin
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: admin.id,
      email: admin.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Google Auth for Admin (similar to user Google Auth, but associate with Admin model)
// const adminGoogleAuth = (req, res, next) => {
//   passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
// };

// Google Auth Callback for Admin
// const adminGoogleAuthCallback = (req, res, next) => {
//   passport.authenticate('google', { failureRedirect: '/admin/login' }, (err, admin, info) => {
//     if (err) {
//       return res.status(500).send({ message: err.message });
//     }
//     if (!admin) {
//       return res.status(401).send({ message: 'Google authentication failed.' });
//     }
//     const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
//       expiresIn: 86400, // 24 hours
//     });
//     res.status(200).send({
//       id: admin.id,
//       email: admin.email,
//       accessToken: token,
//     });
//   })(req, res, next);
// };

module.exports = { registerAdmin, loginAdmin, verifyAdminOtp /*, adminGoogleAuth, adminGoogleAuthCallback*/ };