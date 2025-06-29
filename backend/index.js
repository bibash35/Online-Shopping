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

// app.use(cors({
//   exposedHeaders:"X-TOTAL-COUNT",
//   origin:true,
//   credentials:true
// }));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all domains, or specify a specific one
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

const corsOptions = {
  origin: 'http://localhost:5173', // Specify the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // Allow cookies if needed
  exposedHeaders: ['X-TOTAL-COUNT'], // If you need to expose custom headers
};

app.use(cors(corsOptions));


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
