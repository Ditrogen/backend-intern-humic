const express = require('express');
const router = express.Router(); 
const partnershipController = require('../controllers/partnership.controller'); 
const verifyJWT = require('../middleware/verifyJWT');
const multer = require('../middleware/multer');

router.post('/add', verifyJWT, multer.single('image'), partnershipController.addPartnership);
router.get('/get', partnershipController.getPartnership);
router.delete('/delete/:id', verifyJWT, partnershipController.deletePartnership);

module.exports = router;    