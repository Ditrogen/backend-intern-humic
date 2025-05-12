/**
 * @swagger
 * tags:
 *   name: Lowongan Magang
 *   description: API for managing lowongan magang (internship vacancies)
 */
const express = require("express");
const router = express.Router();
const lowonganMagang = require("../controllers/lowonganMagang.controller");
const verifyJWT = require("../middleware/verifyJWT");

/**
 * @swagger
 * components:
 *   schemas:
 *     LowonganMagang:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         posisi:
 *           type: string
 *           example: "Back End Developer"
 *         kelompok_peminatan:
 *           type: string
 *           example: "Software Development"
 *         jobdesk:
 *           type: string
 *           example: "Develop and maintain the back end of a web applications"
 *         lokasi:
 *           type: string
 *           example: "Remote"
 *         kualifikasi:
 *           type: string
 *           example: "Basic knowledge of JavaScript"
 *         benefit:
 *           type: string
 *           example: "Flexible working hours, Certification"
 *         durasi_awal:
 *           type: string
 *           format: date
 *           example: "2025-05-12"
 *         durasi_akhir:
 *           type: string
 *           format: date
 *           example: "2025-08-12"
 *         status_lowongan:
 *           type: string
 *           example: "dibuka"
 *         paid:
 *           type: boolean
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-05-12T10:00:00Z"
 */

/**
 * @swagger
 * /lowongan-magang-api/add:
 *   post:
 *     summary: Create a new lowongan magang
 *     tags: [Lowongan Magang]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LowonganMagang'
 *     responses:
 *       200:
 *         description: Lowongan magang created successfully
 *       400:
 *         description: Only admin can access this
 *       500:
 *         description: Internal server error
 */
router.post("/add", verifyJWT, lowonganMagang.addLowonganMagang);

/**
 * @swagger
 * /lowongan-magang-api/get:
 *   get:
 *     summary: Get all lowongan magang
 *     tags: [Lowongan Magang]
 *     responses:
 *       200:
 *         description: Successfully retrieved all lowongan magang
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LowonganMagang'
 *       404:
 *         description: Lowongan magang not found
 *       500:
 *         description: Internal server error
 */
router.get("/get", lowonganMagang.getAllLowonganMagang);

/**
 * @swagger
 * /lowongan-magang-api/get/{id}:
 *   get:
 *     summary: Get a specific lowongan magang by ID
 *     tags: [Lowongan Magang]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the lowongan magang
 *     responses:
 *       200:
 *         description: Successfully retrieved the lowongan magang
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LowonganMagang'
 *       404:
 *         description: Lowongan magang not found
 *       500:
 *         description: Internal server error
 */
router.get("/get/:id", lowonganMagang.getLowonganMagangById);

/**
 * @swagger
 * /lowongan-magang-api/delete/{id}:
 *   delete:
 *     summary: Delete a specific lowongan magang by ID
 *     tags: [Lowongan Magang]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the lowongan magang
 *     responses:
 *       200:
 *         description: Lowongan magang deleted successfully
 *       404:
 *         description: Lowongan magang not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/delete/:id",
  verifyJWT,
  lowonganMagang.deleteLowonganMagangById
);

module.exports = router;
