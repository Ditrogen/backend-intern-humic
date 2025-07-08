/**
 * @swagger
 * tags:
 *   name: Mahasiswa
 *   description: API for managing mahasiswa (students)
 */
const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswa.controller');
const verifyJWT = require('../middleware/verifyJWT');

/**
 * @swagger
 * components:
 *   schemas:
 *     Mahasiswa:
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
 *         role:
 *           type: string
 *           example: "mahasiswa"
 *         cv_path:
 *           type: string
 *           example: "/uploads/cv.pdf"
 *         portofolio_path:
 *           type: string
 *           example: "/uploads/portofolio.pdf"
 *         motivasi:
 *           type: string
 *           example: "I want to gain experience in software development."
 *         relevant_skills:
 *           type: string
 *           example: "JavaScript, Node.js"
 */

/**
 * @swagger
 * /mahasiswa-api/get:
 *   get:
 *     summary: Get all mahasiswa
 *     tags: [Mahasiswa]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all mahasiswa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data mahasiswa berhasil diambil"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mahasiswa'
 *       500:
 *         description: Internal server error
 */
router.get('/get', verifyJWT ,mahasiswaController.getAllMahasiswa);

module.exports = router;