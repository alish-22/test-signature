const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path= require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST"],
    credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/docs", require("./routes/docRoutes"));
app.use("/api/signatures", require("./routes/signatureRoutes"));
app.use("/api/audit", require("./routes/auditRoutes"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected successfully!");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});