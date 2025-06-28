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
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-06-19T10:00:00Z"         
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
 * /partnership-api/get/{id}:
 *   get:
 *     summary: Get partnership data by ID
 *     tags: [Partnership]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the partnership
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Partnership data was successfully collected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "patnership data was successfully collected"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Partnership'
 *       404:
 *         description: Partnership not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "partnership not found"
 *       500:
 *         description: Internal server error
 */
router.get('/get/:id', partnershipController.getPartnershipById)

/**
 * @swagger
 * /partnership-api/update/{id}:
 *   patch:
 *     summary: Update a partnership's name or image
 *     tags: [Partnership]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the partnership to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama_partner:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Partnership successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Partnership successfully updated"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nama_partner:
 *                       type: string
 *                     image_path:
 *                       type: string
 *       404:
 *         description: Partnership not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Partnership not found"
 *       500:
 *         description: Internal server error
 */
router.patch('/update/:id', verifyJWT, multer.single('image'), partnershipController.updatePartnership)

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