const axios = require("axios");

const verifyRecaptcha = async (req, res, next) => {
  const recaptchaResponse = req.body['g-recaptcha-response'];
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  
  if (!recaptchaResponse) {
    return res.status(400).json({ message: "Recaptcha token is missing" });
  }
  
  try {
    console.log(recaptchaResponse);
    console.log(secretKey);
    console.log(req.ip);

    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}&remoteip=${req.ip}`)
    const data = response.data;

    if (!data.success) {
      console.log(data);
      
      return res.status(400).json({ message: "Recaptcha verification failed" });
    }
    next();
  } catch (error) {
    console.error("Recaptcha verification error:", error);
    res.status(500).json({ message: "Recaptcha verification failed" });
  }
};

module.exports = verifyRecaptcha;
