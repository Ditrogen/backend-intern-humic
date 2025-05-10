const express = require("express");
const router = express.Router(); 
const authController = require("../controllers/auth.controller");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/login", authController.login);
router.get("/me", verifyJWT, authController.me);

module.exports = router; 