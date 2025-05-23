const express = require('express');
const router = express.Router(); 
const visiController = require('../controllers/visi.controller'); 
const verifyJWT = require('../middleware/verifyJWT');
const multer = require('../middleware/multer');

router.post('/add', verifyJWT, multer.single('image'), visiController.addVisi);
router.get('/get', visiController.getVisi);
router.delete('/delete/:id', verifyJWT, visiController.deleteVisi);


module.exports = router;    
