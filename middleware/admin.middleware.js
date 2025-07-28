const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

const verifyAdminToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    // Check if the user is an admin
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(403).send({ message: 'Requires Admin Role!' });
    }
    req.adminId = decoded.id;
    next();
  });
};

const checkOtpVerified = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin || !admin.otpExpires || admin.otpExpires < new Date()) {
      return res.status(403).send({ message: 'OTP verification required.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { verifyAdminToken, checkOtpVerified };