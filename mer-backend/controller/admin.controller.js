const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const jwt = require('jsonwebtoken');
const { tokenForVerify } = require("../config/auth");
const Admin = require("../model/Admin");
const { generateToken, generateRefreshToken, verifyRefreshToken } = require("../utils/token");
const { sendEmail } = require("../config/email");
const { secret } = require("../config/secret");

// register
const registerAdmin = async (req, res,next) => {
  try {
    const isAdded = await Admin.findOne({ email: req.body.email });
    if (isAdded) {
      return res.status(403).send({
        message: "This Email already Added!",
      });
    } else {
      const newStaff = new Admin({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password),
      });
      const staff = await newStaff.save();
      const token = generateToken(staff);
      res.status(200).send({
        token,
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        joiningData: Date.now(),
      });
    }
  } catch (err) {
    next(err)
  }
};
// login admin
const loginAdmin = async (req, res,next) => {
  // console.log(req.body)
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    // console.log(admin)
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      const token = generateToken(admin);
      const refreshToken = generateRefreshToken(admin);
      
      // Save refresh token to database
      admin.refreshToken = refreshToken;
      admin.refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      await admin.save({ validateBeforeSave: false });
      
      res.send({
        token,
        refreshToken,
        _id: admin._id,
        name: admin.name,
        phone: admin.phone,
        email: admin.email,
        image: admin.image,
        role: admin.role,
      });
    } else {
      res.status(401).send({
        message: "Invalid Email or password!",
      });
    }
  } catch (err) {
    next(err)
  }
};
// forget password
const forgetPassword = async (req, res,next) => {
  try {
    const { email } = req.body;
    // console.log('email--->',email)
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(404).send({
        message: "Admin Not found with this email!",
      });
    } else {
      const token = tokenForVerify(admin);
      const body = {
        from: secret.email_user,
        to: `${email}`,
        subject: "Password Reset",
        html: `<h2>Hello ${email}</h2>
        <p>A request has been received to change the password for your <strong>Shofy</strong> account </p>

        <p>This link will expire in <strong> 10 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for reset your password</p>

        <a href=${secret.admin_url}/forget-password/${token} style="background:#0989FF;color:white;border:1px solid #0989FF; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@shofy.com</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Shofy Team</strong>
        `,
      };
      admin.confirmationToken = token;
      const date = new Date();
      date.setDate(date.getDate() + 1);
      admin.confirmationTokenExpires = date;
      await admin.save({ validateBeforeSave: false });
      const message = "Please check your email to reset password!";
      sendEmail(body, res, message);
    }
  } catch (error) {
    next(error)
  }
};
// confirm-forget-password
const confirmAdminForgetPass = async (req, res,next) => {
  try {
    const { token, password } = req.body;
    const admin = await Admin.findOne({ confirmationToken: token });

    if (!admin) {
      return res.status(403).json({
        status: "fail",
        message: "Invalid token",
      });
    }

    const expired = new Date() > new Date(user.confirmationTokenExpires);

    if (expired) {
      return res.status(401).json({
        status: "fail",
        message: "Token expired",
      });
    } else {
      const newPassword = bcrypt.hashSync(password);
      await Admin.updateOne(
        { confirmationToken: token },
        { $set: { password: newPassword } }
      );

      admin.confirmationToken = undefined;
      admin.confirmationTokenExpires = undefined;

      await admin.save({ validateBeforeSave: false });

      res.status(200).json({
        message: "Password reset successfully",
      });
    }
  } catch (error) {
    next(error)
  }
};

// change password
const changePassword = async (req,res,next) => {
  try {
    const {email,oldPass,newPass} = req.body || {};
    const admin = await Admin.findOne({ email: email });
    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if(!bcrypt.compareSync(oldPass, admin.password)){
      return res.status(401).json({ message: "Incorrect current password" });
    }
    else {
      const hashedPassword = bcrypt.hashSync(newPass);
      await Admin.updateOne({email:email},{password:hashedPassword})
      res.status(200).json({ message: "Password changed successfully" });
    }
  } catch (error) {
    next(error)
  }
}
// reset Password
const resetPassword = async (req, res) => {
  const token = req.body.token;
  const { email } = jwt.decode(token);
  const staff = await Admin.findOne({ email: email });

  if (token) {
    jwt.verify(token,secret.jwt_secret_for_verify,(err, decoded) => {
      if (err) {
        return res.status(500).send({
          message: "Token expired, please try again!",
        });
      } else {
        staff.password = bcrypt.hashSync(req.body.newPassword);
        staff.save();
        res.send({
          message: "Your password change successful, you can login now!",
        });
      }
    });
  }
};
// add staff
const addStaff = async (req, res,next) => {
  try {
    const isAdded = await Admin.findOne({ email: req.body.email });
    if (isAdded) {
      return res.status(500).send({
        message: "This Email already Added!",
      });
    } else {
      const newStaff = new Admin({
        name:req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        phone: req.body.phone,
        joiningDate: req.body.joiningDate,
        role: req.body.role,
        image: req.body.image,
      });
      await newStaff.save();
      res.status(200).send({
        message: "Staff Added Successfully!",
      });
    }
  } catch (err) {
    next(err)
  }
};
// get all staff
const getAllStaff = async (req, res,next) => {
  try {
    const admins = await Admin.find({}).sort({ _id: -1 });
    res.status(200).json({
      status:true,
      message:'Staff get successfully',
      data:admins
    });
  } catch (err) {
    next(err)
  }
};
// getStaffById
const getStaffById = async (req, res,next) => {
  // console.log('getStaffById',req.params.id)
  try {
    const admin = await Admin.findById(req.params.id);
    res.send(admin);
  } catch (err) {
    next(err)
  }
};
// updateStaff
const updateStaff = async (req, res) => {
  try {
    const admin = await Admin.findOne({ _id: req.params.id });
    if (admin) {
      admin.name = req.body.name;
      admin.email = req.body.email;
      admin.phone = req.body.phone;
      admin.role = req.body.role;
      admin.joiningData = req.body.joiningDate;
      admin.image = req.body.image;
      admin.password =
      req.body.password !== undefined
        ? bcrypt.hashSync(req.body.password)
        : admin.password;
      const updatedAdmin = await admin.save();
      const token = generateToken(updatedAdmin);
      res.send({
        token,
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
        image: updatedAdmin.image,
        phone: updatedAdmin.phone,
      });
    } else {
      res.status(404).send({
        message: "This Staff not found!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
// deleteStaff
const deleteStaff = async (req, res,next) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message:'Admin Deleted Successfully',
    });
  } catch (err) {
    next(err)
  }
};

const updatedStatus = async (req, res) => {
  try {
    const newStatus = req.body.status;

    await Admin.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.send({
      message: `Store ${newStatus} Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Refresh Token - Get new access token without re-login
const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find admin and check if refresh token matches
    const admin = await Admin.findById(decoded._id);
    
    if (!admin || admin.refreshToken !== refreshToken) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    // Check if refresh token is expired
    if (admin.refreshTokenExpires && new Date() > admin.refreshTokenExpires) {
      return res.status(403).json({
        success: false,
        message: "Refresh token expired. Please login again.",
      });
    }

    // Generate new access token
    const newAccessToken = generateToken(admin);

    res.status(200).json({
      success: true,
      token: newAccessToken,
      message: "Access token refreshed successfully",
    });

  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token",
      error: error.message,
    });
  }
};

// Logout - Invalidate refresh token
const logoutAdmin = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    // Find admin and clear refresh token
    const admin = await Admin.findOne({ refreshToken });
    
    if (admin) {
      admin.refreshToken = undefined;
      admin.refreshTokenExpires = undefined;
      await admin.save({ validateBeforeSave: false });
    }

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  forgetPassword,
  resetPassword,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  updatedStatus,
  changePassword,
  confirmAdminForgetPass,
  refreshAccessToken,
  logoutAdmin,
};
