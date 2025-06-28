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
 *         link_project:
 *           type: string
 *           example: "https://youtube.com"
 */

/**
 * @swagger
 * /hasil-research-api/add:
 *   post:
 *     summary: Add a HUMIC Internship research (product)
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
 *               link_project:
 *                 type: string
 *                 description: link to the project
 *                 example: "https://youtube.com"
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
 *     summary: Retrieve all research (product) results
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
 *                   example: "Research data was successfully collected"
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
 * /hasil-research-api/get/{id}:
 *   get:
 *     summary: Get research result by ID
 *     tags: [Hasil Research]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the research data to retrieve
 *     responses:
 *       200:
 *         description: Research data was successfully collected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Research data was successfully collected
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       image_path:
 *                         type: string
 *                         example: "/uploads/1629882719283.png"
 *                       nama_project:
 *                         type: string
 *                         example: "Smart Farming IoT"
 *                       deskripsi:
 *                         type: string
 *                         example: "A smart farming system using IoT sensors"
 *                       link_project:
 *                         type: string
 *                         example: "https://github.com/user/smart-farming"
 *       404:
 *         description: Hasil research not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hasil research not found
 *       500:
 *         description: Internal server error
 */
router.get('/get/:id', hasilResearchController.gethasilResearchById)

/**
 * @swagger
 * /hasil-research-api/update/{id}:
 *   patch:
 *     summary: Update an existing hasil research entry
 *     tags: [Hasil Research]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the hasil research to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama_project:
 *                 type: string
 *                 example: "Sistem Deteksi Kualitas Udara"
 *               deskripsi:
 *                 type: string
 *                 example: "Aplikasi yang memantau dan menilai kualitas udara secara real-time"
 *               link_project:
 *                 type: string
 *                 example: "https://github.com/username/project"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional. Upload a new image to replace the old one.
 *     responses:
 *       200:
 *         description: Hasil research successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hasil research successfully updated"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nama_project:
 *                       type: string
 *                     deskripsi:
 *                       type: string
 *                     link_project:
 *                       type: string
 *                     image_path:
 *                       type: string
 *                       example: "/uploads/1721019403915.png"
 *       404:
 *         description: Hasil research not found
 *       500:
 *         description: Internal server error
 */
router.patch("/update/:id", multer.single('image'), hasilResearchController.updateHasilResearch);

/**
 * @swagger
 * /hasil-research-api/delete/{id}:
 *   delete:
 *     summary: Delete a research (product) result by ID
 *     tags: [Hasil Research]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the research (product) result to delete
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
 *                   example: "Research result data successfully deleted"
 *       404:
 *         description: Research result not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', verifyJWT, hasilResearchController.deleteHasilResearch);


module.exports = router;    