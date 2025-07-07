/**
 * @swagger
 * tags:
 *   name: Lamaran Magang
 *   description: API for managing internship applications (lamaran magang)
 */
const express = require('express');
const router = express.Router();
const lamaranMagangController = require('../controllers/lamaranMagang.controller');
const multer = require('../middleware/multer');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRecaptcha = require('../middleware/recaptcha');

/**
 * @swagger
 * components:
 *   schemas:
 *     LamaranMagang:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         id_lamaran_magang:
 *           type: integer
 *           example: 7
 *         nama_depan:
 *           type: string
 *           example: "Wowo"
 *         nama_belakang:
 *           type: string
 *           example: "Wewe"
 *         email:
 *           type: string
 *           example: "yntkts@example.com"
 *         kontak:
 *           type: string
 *           example: "08123456789"
 *         jurusan:
 *           type: string
 *           example: "Informatika"
 *         angkatan:
 *           type: integer
 *           example: 2022
 *         motivasi:
 *           type: string
 *           example: "I want to gain experience in back end development."
 *         relevant_skills:
 *           type: string
 *           example: "JavaScript, Node.js"
 *         cv_path:
 *           type: string
 *           example: "/uploads/cv.pdf"
 *         portofolio_path:
 *           type: string
 *           example: "/uploads/portofolio.pdf"
 *         posisi:
 *           type: string
 *           example: "Backend Developer"
 *         kelompok_peminatan:
 *           type: string
 *           example: "Software Engineering"
 *         status:
 *           type: string
 *           enum: [diproses, diterima, ditolak]
 *           example: "diproses"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-05-12T10:00:00Z"
 */

/**
 * @swagger
 * /lamaran-magang-api/add/{id_lowongan_magang}:
 *   post:
 *     summary: Create a new lamaran magang (internship application)
 *     tags: [Lamaran Magang]
 *     parameters:
 *       - in: path
 *         name: id_lowongan_magang
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID (string) of the lowongan magang (internship)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               g-recaptcha-response:
 *                 type: string
 *                 description: "This field requests the TOKEN GENERATED when the user completes the recaptcha, NOT THE SITE KEY. Refer to the reCAPTCHA v2 docs"
 *               nama_depan:
 *                 type: string
 *               nama_belakang:
 *                 type: string
 *                 nullable: true
 *                 description: Optional, can be left empty
 *               email:
 *                 type: string
 *               kontak:
 *                 type: string
 *               jurusan:
 *                 type: string
 *               angkatan:
 *                 type: integer
 *               motivasi:
 *                 type: string
 *               relevant_skills:
 *                 type: string
 *               cv:
 *                 type: string
 *                 format: binary
 *               portofolio:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Lamaran magang created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internship application submitted successfully."
 *                 data:
 *                   $ref: '#/components/schemas/LamaranMagang'
 *       400:
 *         description: Invalid reCAPTCHA or unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "reCAPTCHA validation failed"
 *                 error:
 *                   type: array
 *                   example: ["invalid-input-response"]
 *       500:
 *         description: Internal server error
 */
router.post(
  '/add/:id_lowongan_magang',
  multer.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'portofolio', maxCount: 1 },
  ]), 
  verifyRecaptcha, // multer dulu baru verify gegara datanya mesti diparse sama multer
  lamaranMagangController.addLamaranMagang
);

/**
 * @swagger
 * /lamaran-magang-api/get:
 *   get:
 *     summary: Get all lamaran magang
 *     tags: [Lamaran Magang]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all lamaran magang
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LamaranMagang'
 *       404:
 *         description: No lamaran magang found
 *       500:
 *         description: Internal server error
 */
router.get('/get', verifyJWT, lamaranMagangController.getAllLamaranMagang);

/**
 * @swagger
 * /lamaran-magang-api/get/{id_lamaran_magang}:
 *   get:
 *     summary: Get lamaran magang by ID
 *     tags: [Lamaran Magang]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_lamaran_magang
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the lamaran magang (internship)
 *     responses:
 *       200:
 *         description: Successfully retrieved lamaran magang
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LamaranMagang'
 *       404:
 *         description: No lamaran magang found
 *       500:
 *         description: Internal server error
 */
router.get(
  '/get/:id_lamaran_magang',
  verifyJWT,
  lamaranMagangController.getLamaranByID
);

/**
 * @swagger
 * /lamaran-magang-api/update/{id_lamaran_magang}:
 *   patch:
 *     summary: Update the status of a lamaran magang
 *     tags: [Lamaran Magang]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_lamaran_magang
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the lamaran magang
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "diterima"
 *     responses:
 *       200:
 *         description: Status lamaran magang updated successfully
 *       404:
 *         description: Unauthorized or lamaran magang not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  '/update/:id_lamaran_magang',
  verifyJWT,
  lamaranMagangController.updateStatusLamaran
);

/**
 * @swagger
 * /lamaran-magang-api/export:
 *   get:
 *     summary: Export all internship applications to Excel
 *     tags: [Lamaran Magang]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Excel file generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access."
 *       500:
 *         description: Error generating Excel file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error generating Excel file"
 */
router.get('/export', verifyJWT, lamaranMagangController.exportDataToExcel);

/**
 * @swagger
 * /lamaran-magang-api/delete:
 *   delete:
 *     summary: Delete all internship applications, students, and their files
 *     tags: [Lamaran Magang]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All student data, applications, and files were successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All student data, applications, and files were successfully deleted.
 *       500:
 *         description: Failed to delete all data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to delete all data.
 *                 error:
 *                   type: string
 */
router.delete("/delete", verifyJWT, lamaranMagangController.deleteAllLamaranMagang);

module.exports = router;