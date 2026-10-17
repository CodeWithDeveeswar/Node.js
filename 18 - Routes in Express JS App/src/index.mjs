// 18. Routes in Express JS App

import express from "express";
import routes from "./routes/router.mjs";

const app = express();

// Middleware to parse incoming JSON data

app.use(express.json());

// Middleware to handle routes

app.use(routes);

const PORT = 3000;

// Root Route

app.get("/", (req, res) => {
  res.send({ msg: "Root" });
});

// Start the Express server

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});

// localhost:3000/api/users?filter=user_name&value=de

// localhost:3000/api/products?filter=product_name&value=25
