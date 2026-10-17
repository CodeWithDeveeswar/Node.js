// 19. Cookies in Express JS App

// npm install cookie-parser

import express from "express";
import routes from "./routes/router.mjs";
import cookieParser from "cookie-parser";

// Create an Express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse cookies and support signed cookies
app.use(cookieParser("Code IO"));

// Middleware to handle routes
app.use(routes);

// Define the server port
const PORT = 3000;

// Root Route
app.get("/", (req, res) => {
  // Set a signed cookie that expires after one hour
  res.cookie("user", "Admin", { maxAge: 60000 * 60, signed: true });

  // Send response
  res.send({ msg: "Root" });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});

// Query Parameters - Filter Users
// localhost:3000/api/users?filter=user_name&value=de

// Query Parameters - Filter Products
// localhost:3000/api/products?filter=product_name&value=25
