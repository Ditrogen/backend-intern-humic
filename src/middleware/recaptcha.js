const axios = require("axios");

const verifyRecaptcha = async (req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    next();
  }

  const recaptchaToken = req.body["recaptchaResponse"];
  if (!recaptchaToken) {
    return res.status(400).json({ message: "Recaptcha token is missing" });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`
    );
    const data = response.data;

    if (!data.success) {
      return res.status(400).json({ message: "Recaptcha verification failed" });
    }
    next();
  } catch (error) {
    console.error("Recaptcha verification error:", error);
    res.status(500).json({ message: "Recaptcha verification failed" });
  }
};

module.exports = verifyRecaptcha;
