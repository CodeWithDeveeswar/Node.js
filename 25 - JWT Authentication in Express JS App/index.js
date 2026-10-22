// 25. JWT Authentication in Express JS App

// npm install express nodemon mongoose dotenv
// npm install bcryptjs jsonwebtoken cookie-parser

const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connected...!"))
  .catch((err) => console.log(`DB Connection Failed: ${err}`));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/user", authRoutes);

app.listen(5000, () => {
  console.log("Server Running...!");
});
