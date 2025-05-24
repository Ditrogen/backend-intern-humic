
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

// Test koneksi
transporter.verify((error, success) => {
  if (error) {
      console.log('Error setup email:', error);
  } else {
      console.log('Server siap mengirim email');
  }
});

module.exports = transporter;
