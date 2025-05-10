const express = require("express");
const router = express.Router();
const lowonganMagang = require("../controllers/lowonganMagang.controller");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/add", verifyJWT, lowonganMagang.addLowonganMagang);
router.get("/get", lowonganMagang.getAllLowonganMagang);
router.get("/get/:id", lowonganMagang.getLowonganMagangById);
router.delete(
  "/delete/:id",
  verifyJWT,
  lowonganMagang.deleteLowonganMagangById
);

module.exports = router;
