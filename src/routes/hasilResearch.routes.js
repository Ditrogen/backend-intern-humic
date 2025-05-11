const express = require('express');
const router = express.Router(); 
const hasilResearchController= require('../controllers/hasilResearch.controller'); 
const verifyJWT = require('../middleware/verifyJWT');
const multer = require('../middleware/multer'); 

router.post('/add', verifyJWT, multer.single('image'), hasilResearchController.addHasilResearch); 
router.get('/get', hasilResearchController.gethasilResearch);
router.delete('/delete/:id', verifyJWT, hasilResearchController.deleteHasilResearch);


module.exports = router;    