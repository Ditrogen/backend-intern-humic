const express = require('express');
const router = express.Router(); 
const misiController = require('../controllers/misi.controller'); 
const verifyJWT = require('../middleware/verifyJWT');
const multer = require('../middleware/multer');

router.post('/add', verifyJWT, multer.single('image'), misiController.addMisi);
router.get('/get', misiController.getMisi);
router.delete('/delete/:id', verifyJWT, misiController.deleteMisi);


module.exports = router;    