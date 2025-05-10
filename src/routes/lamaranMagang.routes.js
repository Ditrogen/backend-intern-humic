const express = require('express');
const router = express.Router();
const lamaranMagangController = require('../controllers/lamaranMagang.controller');
const multer = require('../middleware/multer');
const verifyJWT = require('../middleware/verifyJWT');

router.post(
  '/add/:id_lowongan_magang',
  multer.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'portofolio', maxCount: 1 },
  ]),
  lamaranMagangController.addLamaranMagang
);
router.get('/get', verifyJWT, lamaranMagangController.getAllLamaranMagang);

module.exports = router;