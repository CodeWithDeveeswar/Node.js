// 26. Password Reset API in Express JS App

// npm install express nodemon mongoose dotenv
// npm install bcryptjs jsonwebtoken cookie-parser

const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connected...!"))
  .catch((err) => console.log(`DB Connection Failed: ${err}`));

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", authRoutes);

app.listen(5000, () => {
  console.log("Server Running...!");
});
