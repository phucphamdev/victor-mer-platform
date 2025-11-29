const express = require('express');
const router = express.Router();
const userController= require('../controller/user.controller');
const verifyToken = require('../middleware/verifyToken');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User authentication and management
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Đăng ký tài khoản người dùng
 *     description: Tạo tài khoản người dùng mới. Tài khoản sẽ được kích hoạt tự động trong môi trường dev.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên người dùng (bắt buộc, tối thiểu 3 ký tự)
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Nguyễn Văn A"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email (bắt buộc, phải là email hợp lệ)
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mật khẩu (bắt buộc, tối thiểu 6 ký tự)
 *                 minLength: 6
 *                 example: "123456"
 *               phone:
 *                 type: string
 *                 description: Số điện thoại (không bắt buộc)
 *                 example: "0901234567"
 *               address:
 *                 type: string
 *                 description: Địa chỉ (không bắt buộc)
 *                 example: "123 Đường ABC, Quận 1, TP.HCM"
 *           example:
 *             name: "Nguyễn Văn A"
 *             email: "user@example.com"
 *             password: "123456"
 *             phone: "0901234567"
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Account created successfully. You can now login."
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "507f1f77bcf86cd799439011"
 *                         name:
 *                           type: string
 *                           example: "Nguyễn Văn A"
 *                         email:
 *                           type: string
 *                           example: "user@example.com"
 *                         role:
 *                           type: string
 *                           example: "user"
 *                         status:
 *                           type: string
 *                           example: "active"
 *       400:
 *         description: Email đã tồn tại hoặc dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "failed"
 *                 message:
 *                   type: string
 *                   example: "Email already exists"
 */
router.post("/register", userController.signup);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     description: Đăng nhập vào hệ thống và nhận JWT token. Tài khoản phải ở trạng thái active.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email đăng nhập (bắt buộc)
 *                 example: "paul@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mật khẩu (bắt buộc)
 *                 example: "123456"
 *           example:
 *             email: "paul@gmail.com"
 *             password: "123456"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Successfully logged in"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "507f1f77bcf86cd799439011"
 *                         name:
 *                           type: string
 *                           example: "Paul R. Bruns"
 *                         email:
 *                           type: string
 *                           example: "paul@gmail.com"
 *                         role:
 *                           type: string
 *                           example: "user"
 *                         status:
 *                           type: string
 *                           example: "active"
 *                     token:
 *                       type: string
 *                       description: JWT token để xác thực các request tiếp theo
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Thông tin đăng nhập không đúng hoặc tài khoản chưa active
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "Password is not correct"
 *       403:
 *         description: Mật khẩu không đúng
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /api/user/password/reset:
 *   post:
 *     summary: Request password reset
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset email sent
 */
router.post('/password/reset', userController.forgetPassword);

/**
 * @swagger
 * /api/user/password/confirm:
 *   post:
 *     summary: Confirm password reset
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post('/password/confirm', userController.confirmForgetPassword);

/**
 * @swagger
 * /api/user/password:
 *   patch:
 *     summary: Change user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
router.patch('/password', verifyToken, userController.changePassword);

/**
 * @swagger
 * /api/user/email/confirm/{token}:
 *   get:
 *     summary: Confirm user email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email confirmed
 */
router.get('/email/confirm/:token', userController.confirmEmail);

/**
 * @swagger
 * /api/user/oauth/{token}:
 *   post:
 *     summary: Register or login with OAuth provider
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 */
router.post("/oauth/:token", userController.signUpWithProvider);

/**
 * @swagger
 * /api/user/{id}:
 *   patch:
 *     summary: Update user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.patch('/:id', verifyToken, userController.updateUser);

module.exports = router;