const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const { ConnectToDb } = require("./db/Connection");

// Load environment variables
dotenv.config();

// Connect to MongoDB
ConnectToDb();

// --- MIDDLEWARES --- //

// CORS (Allow frontend access)
app.use(cors({
  exposedHeaders: "X-TOTAL-COUNT",
  origin: true,
  credentials: true,
}));

// CORS headers fallback
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Log content-type of incoming requests (optional, for debugging)
app.use((req, res, next) => {
  console.log("Incoming Content-Type:", req.headers["content-type"]);
  next();
});

// Static file serving
app.use("/uploads", express.static("uploads"));

// Only parse JSON **after** file uploads handled (Multer will parse multipart)
app.use(express.json()); // Handles application/json
app.use(express.urlencoded({ extended: true })); // Handles x-www-form-urlencoded

// --- ROUTES --- //
const authRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const messageRoutes = require("./routes/message");

app.use("/api/products", productRoutes);     // File upload routes
app.use("/api/auth", authRoutes);
app.use("/api", messageRoutes);

// --- START SERVER --- //
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
