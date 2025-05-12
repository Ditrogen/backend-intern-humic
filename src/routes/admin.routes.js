/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API for admin management
 */
const express = require("express");
const router = express.Router(); 
const adminController = require("../controllers/admin.controller");
const verifyJWT = require("../middleware/verifyJWT");

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nama_depan:
 *           type: string
 *           example: "John"
 *         nama_belakang:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           example: "admin@example.com"
 *         role:
 *           type: string
 *           example: "admin"
 */

/**
 * @swagger
 * /admin-api/add:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_depan:
 *                 type: string
 *                 example: "John"
 *               nama_belakang:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Admin created successfully
 *       400:
 *         description: Email already exists or unauthorized access
 *       500:
 *         description: Internal server error
 */
router.post("/add",verifyJWT , adminController.addAdmin);

/**
 * @swagger
 * /admin-api/get:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Successfully retrieved all admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Internal server error
 */
router.get("/get", adminController.getAdmin);



module.exports = router;