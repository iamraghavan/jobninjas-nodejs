const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Google Auth routes (uncomment and configure with Passport.js)
// router.get('/google', authController.googleAuth);
// router.get('/google/callback', authController.googleAuthCallback);

module.exports = router;