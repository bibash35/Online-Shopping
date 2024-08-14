const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { ConnectToDb } = require("./db/Connection");
const authRoutes = require("./routes/user");
const productRoutes=require("./routes/product")
const messageRoutes=require("./routes/message")
const fileUpload = require("express-fileupload");
const cors = require("cors");

dotenv.config();

// Connect to the database
ConnectToDb();

app.use(cors());

app.use(express.json()); 
app.use(fileUpload());

app.use("/uploads", express.static("uploads"));
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api",messageRoutes );

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
}); 
