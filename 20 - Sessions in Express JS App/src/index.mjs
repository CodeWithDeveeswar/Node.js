// 20. Sessions in Express JS App

// npm install cookie-parser
// npm install express-session

import express from "express";
import routes from "./routes/router.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";

// Create an Express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse cookies and support signed cookies
app.use(cookieParser("Code IO"));

// Middleware to configure session management
app.use(
  session({
    // Secret key used to sign the session ID cookie
    secret: "Keep Secrete",

    // Do not save new sessions until they are modified
    saveUninitialized: false,

    // Do not save the session again if it has not changed
    resave: false,

    // Set session cookie lifetime to 1 hour
    cookie: {
      maxAge: 60000 * 60,
    },
  }),
);

// Middleware to handle routes
app.use(routes);

// Define the server port
const PORT = 3000;

// Root Route
app.get("/", (req, res) => {
  // Set a signed cookie that expires after one hour
  res.cookie("user", "Admin", { maxAge: 60000 * 60, signed: true });

  // console.log(req.session);

  // Display the current session ID
  console.log(req.session.id);

  // Retrieve session data from the session store using the session ID
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
    } else {
      // Display the retrieved session data
      console.log(sessionData);
    }
  });

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
