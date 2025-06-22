/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for admin authentication
 */
const express = require("express");
const router = express.Router(); 
const authController = require("../controllers/auth.controller");
const verifyJWT = require("../middleware/verifyJWT");

/**
 * @swagger
 * /auth-api/login:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth-api/me:
 *   get:
 *     summary: Retrieve authenticated admin details
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get admin details successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get admin successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nama_depan:
 *                       type: string
 *                       example: "John"
 *                     nama_belakang:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "admin@example.com"
 *                     role:
 *                       type: string
 *                       example: "admin"
 *       401:
 *         description: Authorization header missing or invalid
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
router.get("/me", verifyJWT, authController.me);

module.exports = router; 