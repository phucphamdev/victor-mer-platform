const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { loginLimiter, passwordResetLimiter, refreshTokenLimiter } = require('../middleware/rateLimiter');
const {
  registerAdmin,
  loginAdmin,
  updateStaff,
  changePassword,
  addStaff,
  getAllStaff,
  deleteStaff,
  getStaffById,
  forgetPassword,
  confirmAdminForgetPass,
  refreshAccessToken,
  logoutAdmin,
} = require("../controller/admin.controller");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin and staff management
 */

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Đăng ký admin mới
 *     description: Tạo tài khoản admin mới trong hệ thống. Không yêu cầu xác thực.
 *     tags: [Admin]
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
 *                 description: Tên admin (bắt buộc)
 *                 example: "Nguyễn Văn A"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email admin (bắt buộc, phải là email hợp lệ)
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mật khẩu (bắt buộc, tối thiểu 6 ký tự)
 *                 example: "123456"
 *               phone:
 *                 type: string
 *                 description: Số điện thoại (không bắt buộc)
 *                 example: "0901234567"
 *               role:
 *                 type: string
 *                 description: Vai trò (không bắt buộc, mặc định Admin)
 *                 enum: [Admin, Manager, CEO, Super Admin]
 *                 example: "Admin"
 *               image:
 *                 type: string
 *                 description: URL ảnh đại diện (không bắt buộc)
 *                 example: "https://example.com/avatar.jpg"
 *           example:
 *             name: "Nguyễn Văn A"
 *             email: "admin@example.com"
 *             password: "123456"
 *             phone: "0901234567"
 *             role: "Admin"
 *     responses:
 *       201:
 *         description: Đăng ký admin thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 _id:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439011"
 *                 name:
 *                   type: string
 *                   example: "Nguyễn Văn A"
 *                 email:
 *                   type: string
 *                   example: "admin@example.com"
 *       400:
 *         description: Email đã tồn tại hoặc dữ liệu không hợp lệ
 */
router.post("/register", registerAdmin);

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Đăng nhập admin
 *     description: Đăng nhập vào hệ thống admin và nhận JWT token. Không yêu cầu xác thực.
 *     tags: [Admin]
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
 *                 description: Email admin (bắt buộc)
 *                 example: "dorothy@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mật khẩu (bắt buộc)
 *                 example: "123456"
 *           example:
 *             email: "dorothy@gmail.com"
 *             password: "123456"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token để xác thực các request tiếp theo
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 _id:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439011"
 *                 name:
 *                   type: string
 *                   example: "Dorothy R. Brown"
 *                 email:
 *                   type: string
 *                   example: "dorothy@gmail.com"
 *                 phone:
 *                   type: string
 *                   example: "708-628-3122"
 *                 role:
 *                   type: string
 *                   example: "Admin"
 *                 image:
 *                   type: string
 *                   example: "https://i.ibb.co/wpjNftS/user-2.jpg"
 *       401:
 *         description: Email hoặc mật khẩu không đúng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid Email or password!"
 */
router.post("/login", loginLimiter, loginAdmin);

/**
 * @swagger
 * /api/admin/password:
 *   patch:
 *     summary: Change admin password
 *     tags: [Admin]
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
router.patch("/password", verifyToken, changePassword);

/**
 * @swagger
 * /api/admin/staff:
 *   post:
 *     summary: Add a new staff member
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Staff added successfully
 *   get:
 *     summary: Get all staff members
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of staff members
 */
router.post("/staff", verifyToken, addStaff);
router.get("/staff", verifyToken, getAllStaff);

/**
 * @swagger
 * /api/admin/forget-password:
 *   patch:
 *     summary: Request password reset
 *     tags: [Admin]
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
router.patch("/forget-password", passwordResetLimiter, forgetPassword);

/**
 * @swagger
 * /api/admin/confirm-forget-password:
 *   patch:
 *     summary: Confirm password reset
 *     tags: [Admin]
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
router.patch("/confirm-forget-password", confirmAdminForgetPass);

/**
 * @swagger
 * /api/admin/staff/{id}:
 *   get:
 *     summary: Get staff by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff details
 *       404:
 *         description: Staff not found
 *   patch:
 *     summary: Update staff information
 *     tags: [Admin]
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
 *     responses:
 *       200:
 *         description: Staff updated successfully
 *   delete:
 *     summary: Delete staff member
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff deleted successfully
 */
router.get("/staff/:id", verifyToken, getStaffById);
router.patch("/staff/:id", verifyToken, updateStaff);
router.delete("/staff/:id", verifyToken, deleteStaff);

/**
 * @swagger
 * /api/admin/refresh-token:
 *   post:
 *     summary: Làm mới access token
 *     description: Sử dụng refresh token để lấy access token mới mà không cần đăng nhập lại. Giúp duy trì phiên đăng nhập an toàn.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token nhận được khi đăng nhập (bắt buộc)
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Access token mới được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: Access token mới
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 message:
 *                   type: string
 *                   example: "Access token refreshed successfully"
 *       401:
 *         description: Thiếu refresh token
 *       403:
 *         description: Refresh token không hợp lệ hoặc đã hết hạn
 */
router.post("/refresh-token", refreshTokenLimiter, refreshAccessToken);

/**
 * @swagger
 * /api/admin/logout:
 *   post:
 *     summary: Đăng xuất
 *     description: Vô hiệu hóa refresh token để đăng xuất an toàn. Sau khi logout, refresh token không thể sử dụng được nữa.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token cần vô hiệu hóa (bắt buộc)
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 *       400:
 *         description: Thiếu refresh token
 */
router.post("/logout", logoutAdmin);

module.exports = router;
