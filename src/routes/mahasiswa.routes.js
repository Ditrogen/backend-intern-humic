const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswa.controller');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/get', verifyJWT ,mahasiswaController.getAllMahasiswa);

module.exports = router;