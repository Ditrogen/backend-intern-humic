/**
 * @swagger
 * tags:
 *   name: Hasil Research
 *   description: API for managing research results
 */
const express = require('express');
const router = express.Router(); 
const hasilResearchController= require('../controllers/hasilResearch.controller'); 
const verifyJWT = require('../middleware/verifyJWT');
const multer = require('../middleware/multer'); 

/**
 * @swagger
 * components:
 *   schemas:
 *     HasilResearch:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         image_path:
 *           type: string
 *           example: "/uploads/research_image.png"
 *         nama_project:
 *           type: string
 *           example: "Machine Learning for Healthcare"
 *         deskripsi:
 *           type: string
 *           example: "A project exploring machine learning techniques in healthcare."
 */

/**
 * @swagger
 * /hasil-research-api/add:
 *   post:
 *     summary: Add a new research result
 *     tags: [Hasil Research]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama_project:
 *                 type: string
 *                 description: Name of the research project
 *                 example: "Machine Learning for Healthcare"
 *               deskripsi:
 *                 type: string
 *                 description: Description of the research project
 *                 example: "A project exploring machine learning techniques in healthcare."
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image of the research project
 *     responses:
 *       200:
 *         description: Research result added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data hasil research berhasil ditambahkan"
 *                 data:
 *                   type: object
 *                   properties:
 *                     nama_project:
 *                       type: string
 *                       example: "Machine Learning for Healthcare"
 *                     deskripsi:
 *                       type: string
 *                       example: "A project exploring machine learning techniques in healthcare."
 *                     image_path:
 *                       type: string
 *                       example: "/uploads/research_image.png"
 *       500:
 *         description: Internal server error
 */
router.post('/add', verifyJWT, multer.single('image'), hasilResearchController.addhasilResearch);

/**
 * @swagger
 * /hasil-research-api/get:
 *   get:
 *     summary: Get all research results
 *     tags: [Hasil Research]
 *     responses:
 *       200:
 *         description: Successfully retrieved all research results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data hasil research berhasil diambil"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/HasilResearch'
 *       404:
 *         description: No research data found
 *       500:
 *         description: Internal server error
 */
router.get('/get', hasilResearchController.gethasilResearch);

/**
 * @swagger
 * /hasil-research-api/delete/{id}:
 *   delete:
 *     summary: Delete a research result by ID
 *     tags: [Hasil Research]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the research result to delete
 *     responses:
 *       200:
 *         description: Research result deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data hasil research berhasil dihapus"
 *       404:
 *         description: Research result not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', verifyJWT, hasilResearchController.deleteHasilResearch);


module.exports = router;    