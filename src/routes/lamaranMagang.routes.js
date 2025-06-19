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
 *         status:
 *           type: string
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
 *           type: integer
 *         description: The ID of the lowongan magang (internship)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               recaptchaResponse:
 *                 type: string
 *               nama_depan:
 *                 type: string
 *                 example: "Wowo"
 *               nama_belakang:
 *                 type: string
 *                 example: "Wewe"
 *               email:
 *                 type: string
 *                 example: "yntkts@example.com"
 *               kontak:
 *                 type: string
 *                 example: "08123456789"
 *               jurusan:
 *                 type: string
 *                 example: "Informatika"
 *               angkatan:
 *                 type: integer
 *                 example: 2022
 *               motivasi:
 *                 type: string
 *                 example: "I want to gain experience in back end development."
 *               relevant_skills:
 *                 type: string
 *                 example: "JavaScript, Node.js"
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
 *                   example: "Lamaran magang berhasil ditambahkan"
 *                 data:
 *                   $ref: '#/components/schemas/LamaranMagang'
 *       400:
 *         description: Invalid reCAPTCHA or unauthorized accsess
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: reCAPTCHA validation failed
 *                 error:
 *                   type: array
 *                   example: invalid-input-response
 *       500:
 *         description: Internal server error
 */

router.post(
  '/add/:id_lowongan_magang',
  multer.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'portofolio', maxCount: 1 },
  ]),
  lamaranMagangController.addLamaranMagang
);

// router.post(
//   '/add/:id_lowongan_magang', verifyRecaptcha ,
//   multer.fields([
//     { name: 'cv', maxCount: 1 },
//     { name: 'portofolio', maxCount: 1 },
//   ]),
//   lamaranMagangController.addLamaranMagang
// );

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
 * /lamaran-magang-api/get/{id_lowongan_magang}:
 *   get:
 *     summary: Get all lamaran magang by internship ID
 *     tags: [Lamaran Magang]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_lowongan_magang
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the lowongan magang (internship)
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
  '/get/:id_lowongan_magang',
  verifyJWT,
  lamaranMagangController.getLamaranByIDLowonganMagang
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
 *           type: integer
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

module.exports = router;