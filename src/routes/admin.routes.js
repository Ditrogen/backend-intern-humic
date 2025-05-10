const express = require("express");
const router = express.Router(); 
const adminController = require("../controllers/admin.controller");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/add",verifyJWT , adminController.addAdmin);
router.get("/get", adminController.getAdmin);



module.exports = router;