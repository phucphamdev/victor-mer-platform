require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const connectDB = require("./config/db");
const { secret } = require("./config/secret");
const PORT = secret.port || 7000;
const morgan = require('morgan')
// error handler
const globalErrorHandler = require("./middleware/global-error-handler");
// routes
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const brandRoutes = require("./routes/brand.routes");
const userOrderRoutes = require("./routes/user.order.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const couponRoutes = require("./routes/coupon.routes");
const reviewRoutes = require("./routes/review.routes");
const adminRoutes = require("./routes/admin.routes");
const uploadRouter = require('./routes/uploadFile.routes');
const cloudinaryRoutes = require("./routes/cloudinary.routes");
const { specs, swaggerUi, swaggerUiOptions } = require('./config/swagger');
const verifyToken = require('./middleware/verifyToken');

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// connect database
connectDB();

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// Public routes (no authentication required)
app.use("/api/user", userRoutes);

// Protected routes (authentication required)
app.use("/api/category", verifyToken, categoryRoutes);
app.use("/api/brand", verifyToken, brandRoutes);
app.use("/api/product", verifyToken, productRoutes);
app.use('/api/upload', verifyToken, uploadRouter);
app.use("/api/order", verifyToken, orderRoutes);
app.use("/api/coupon", verifyToken, couponRoutes);
app.use("/api/user-order", verifyToken, userOrderRoutes);
app.use("/api/review", verifyToken, reviewRoutes);
app.use("/api/cloudinary", verifyToken, cloudinaryRoutes);
app.use("/api/admin", verifyToken, adminRoutes);

// root route
app.get("/", (req, res) => res.send("Apps worked successfully"));

// health check endpoint for Docker
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// global error handler
app.use(globalErrorHandler);
//* handle not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

module.exports = app;
