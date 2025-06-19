/**
 * @swagger
 * tags:
 *   name: Lowongan Magang
 *   description: "API for managing lowongan magang (internship vacancies)"
 */

const express = require("express");
const router = express.Router();
const lowonganMagang = require("../controllers/lowonganMagang.controller");
const verifyJWT = require("../middleware/verifyJWT");
const multer = require('../middleware/multer');

/**
 * @swagger
 * components:
 *   schemas:
 *     LowonganMagang:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "LWN-2025-001"
 *         posisi:
 *           type: string
 *           example: "Back End Developer"
 *         kelompok_peminatan:
 *           type: string
 *           example: "Software Development"
 *         image_path:
 *           type: string
 *           example: "/uploads/poster.png"
 *         jobdesk:
 *           type: string
 *           example: "Develop RESTful APIs and maintain databases"
 *         lokasi:
 *           type: string
 *           example: "Remote"
 *         kualifikasi:
 *           type: string
 *           example: "Familiarity with Node.js and Express"
 *         benefit:
 *           type: string
 *           example: "E-certificate, mentoring, flexible hours"
 *         durasi_awal:
 *           type: string
 *           format: date
 *           example: "2025-07-01"
 *         durasi_akhir:
 *           type: string
 *           format: date
 *           example: "2025-10-01"
 *         status_lowongan:
 *           type: string
 *           enum: [dibuka, ditutup]
 *           example: "dibuka"
 *         paid:
 *           type: string
 *           enum: [paid, unpaid]
 *           example: "paid"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-06-19T10:00:00Z"
 */

/**
 * @swagger
 * /lowongan-magang-api/add:
 *   post:
 *     summary: "Create a new lowongan magang"
 *     tags: [Lowongan Magang]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - posisi
 *               - kelompok_peminatan
 *               - jobdesk
 *               - lokasi
 *               - kualifikasi
 *               - benefit
 *               - durasi_awal
 *               - durasi_akhir
 *               - paid
 *               - image
 *             properties:
 *               posisi:
 *                 type: string
 *                 example: "Back End Development"
 *               kelompok_peminatan:
 *                 type: string
 *                 example: "Software Engineering"
 *               jobdesk:
 *                 type: string
 *                 example: "Membuat Schema database, membuat API, mengurus CI/CD"
 *               lokasi:
 *                 type: string
 *                 example: "Onsite"
 *               kualifikasi:
 *                 type: string
 *                 example: "Express"
 *               benefit:
 *                 type: string
 *                 example: "Pengalaman"
 *               durasi_awal:
 *                 type: string
 *                 format: date
 *               durasi_akhir:
 *                 type: string
 *                 format: date
 *               paid:
 *                 type: string
 *                 enum: [paid, unpaid]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: "Lowongan magang created successfully"
 *       403:
 *         description: "Access denied: Only admins can access this route"
 *       500:
 *         description: "Internal server error"
 */
router.post("/add", verifyJWT, multer.single("image"), lowonganMagang.addLowonganMagang);

/**
 * @swagger
 * /lowongan-magang-api/get:
 *   get:
 *     summary: "Get all lowongan magang"
 *     tags: [Lowongan Magang]
 *     responses:
 *       200:
 *         description: "Successfully retrieved all lowongan magang"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LowonganMagang'
 *       404:
 *         description: "No internship vacancies found"
 *       500:
 *         description: "Internal server error"
 */
router.get("/get", lowonganMagang.getAllLowonganMagang);

/**
 * @swagger
 * /lowongan-magang-api/get/{id}:
 *   get:
 *     summary: "Get a specific lowongan magang by ID"
 *     tags: [Lowongan Magang]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The ID of the lowongan magang"
 *     responses:
 *       200:
 *         description: "Successfully retrieved the lowongan magang"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/LowonganMagang'
 *       404:
 *         description: "Internship vacancy not found"
 *       500:
 *         description: "Internal server error"
 */
router.get("/get/:id", lowonganMagang.getLowonganMagangById);

/**
 * @swagger
 * /lowongan-magang-api/delete/{id}:
 *   delete:
 *     summary: "Delete a specific lowongan magang by ID"
 *     tags: [Lowongan Magang]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The ID of the lowongan magang"
 *     responses:
 *       200:
 *         description: "Internship vacancy deleted successfully"
 *       403:
 *         description: "Access denied: Only admins can access this route"
 *       404:
 *         description: "Internship vacancy not found"
 *       500:
 *         description: "Internal server error"
 */
router.delete("/delete/:id", verifyJWT, lowonganMagang.deleteLowonganMagangById);

module.exports = router;
