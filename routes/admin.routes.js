const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const adminMiddleware = require('../middleware/admin.middleware');

router.post('/register', adminController.registerAdmin); // Consider protecting this route
router.post('/login', adminController.loginAdmin);
router.post('/verify-otp', adminController.verifyAdminOtp);

// Example of a protected admin route
// router.get('/dashboard', [adminMiddleware.verifyAdminToken, adminMiddleware.checkOtpVerified], (req, res) => {
//   res.status(200).send('Admin Dashboard Data');
// });

// Google Auth routes for Admin (uncomment and configure with Passport.js)
// router.get('/google', adminController.adminGoogleAuth);
// router.get('/google/callback', adminController.adminGoogleAuthCallback);

module.exports = router;