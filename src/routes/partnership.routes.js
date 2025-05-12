/**
 * @swagger
 * tags:
 *   name: Partnership
 *   description: API for managing partnerships
 */
const express = require('express');
const router = express.Router(); 
const partnershipController = require('../controllers/partnership.controller'); 
const verifyJWT = require('../middleware/verifyJWT');
const multer = require('../middleware/multer');

/**
 * @swagger
 * components:
 *   schemas:
 *     Partnership:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nama_partner:
 *           type: string
 *           example: "Umbrella Corp"
 *         image_path:
 *           type: string
 *           example: "/uploads/logo.png"
 */

/**
 * @swagger
 * /partnership-api/add:
 *   post:
 *     summary: Add a new partnership
 *     tags: [Partnership]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama_partner:
 *                 type: string
 *                 description: Name of the partner
 *                 example: "Tech Corp"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Partnership added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data partnership berhasil ditambahkan"
 *                 data:
 *                   type: object
 *                   properties:
 *                     nama_partner:
 *                       type: string
 *                       example: "Umbrella Corp"
 *                     image_path:
 *                       type: string
 *                       example: "/uploads/logo.png"
 *       500:
 *         description: Internal server error
 */
router.post('/add', verifyJWT, multer.single('image'), partnershipController.addPartnership);

/**
 * @swagger
 * /partnership-api/get:
 *   get:
 *     summary: Get all partnerships
 *     tags: [Partnership]
 *     responses:
 *       200:
 *         description: Successfully retrieved all partnerships
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data partnership berhasil diambil"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Partnership'
 *       404:
 *         description: No partnership data found
 *       500:
 *         description: Internal server error
 */
router.get('/get', partnershipController.getPartnership);

/**
 * @swagger
 * /partnership-api/delete/{id}:
 *   delete:
 *     summary: Delete a partnership by ID
 *     tags: [Partnership]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the partnership to delete
 *     responses:
 *       200:
 *         description: Partnership deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data partnership berhasil dihapus"
 *       404:
 *         description: Partnership not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', verifyJWT, partnershipController.deletePartnership);

module.exports = router;    