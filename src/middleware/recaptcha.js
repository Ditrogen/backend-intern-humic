const axios = require("axios");
const path = require('path');
const { deleteFileIfExists } = require('../config/fileHelper');

const verifyRecaptcha = async (req, res, next) => {
  const recaptchaToken = req.body["g-recaptcha-response"];
  console.log(req.files.cv?.[0].filename)

  const cv = req.files.cv?.[0].filename
  const pdf = req.files.portofolio?.[0].filename
  const files = [cv, pdf]
  
  if (!recaptchaToken) {
    deleteFiles(files);
    return res.status(400).json({ message: "Recaptcha token is missing" });
  }

  console.log(recaptchaToken)
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`
    );
    const data = response.data;

    if (!data.success) {
      deleteFiles(files)
      return res.status(400).json({ message: "Recaptcha verification failed" });
    }
    next();
  } catch (error) {
    console.error("Recaptcha verification error:", error);
    res.status(500).json({ message: "Recaptcha verification failed" });
  }
};

// mesti delete karena di urutan routes, multer langsung ngeupload ke server meski gagal verif
const deleteFiles = async (files) => {
  for (const file of files) {
    if (file) {
      const file_path = `/uploads/${file}`
      const fileName = path.basename(file_path);
      await deleteFileIfExists(fileName);
    }
  }
} 

module.exports = verifyRecaptcha;
