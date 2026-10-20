// 24. Google Login (OAuth 2.0) in Express JS App

// npm install express nodemon express-validator cookie-parser express-session
// npm install passport passport-local mongoose bcrypt dotenv
// npm install passport-google-oauth20

import express from "express";
import routes from "./routes/router.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import mongoose from "mongoose";
import { User } from "./mongoose/schema/user.mjs";
import { comparePassword } from "../src/utils/helper.mjs";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse cookies and support signed cookies
app.use(cookieParser("Code IO"));

// Connect to MongoDB and handle connection errors
mongoose
  .connect("mongodb://localhost/express")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(`Error: ${err}`));

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

// Middleware to initialize Passport and manage session authentication
app.use(passport.initialize());
app.use(passport.session());

// Configure Local Strategy for username and password authentication
passport.use(
  new LocalStrategy(
    { usernameField: "user_name", passwordField: "password" },
    async (user_name, password, done) => {
      try {
        // Find the user in the database by username
        const user = await User.findOne({ user_name: user_name });

        // Check if the username exists
        if (!user) {
          return done(null, false, { message: "Invalid Username" });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = comparePassword(password, user.password);

        // Check if the password is correct
        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect Password" });
        }

        // Return the authenticated user
        return done(null, user);
      } catch (err) {
        // Handle database or authentication errors
        console.log(err);

        return done(err, false);
      }
    },
  ),
);

// Store the user ID in the session after successful authentication
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve the user from the database using the stored session ID
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user by their MongoDB document ID
    const user = await User.findById(id);

    // Return the retrieved user or false if no user exists
    done(null, user);
  } catch (err) {
    // Handle errors while retrieving the user
    console.log(err);

    done(err, false);
  }
});

// Middleware to handle routes
app.use(routes);

// Define the server port
const PORT = 3000;

// Root Route
app.get("/", (req, res) => {
  // Set a signed cookie that expires after one hour
  res.cookie("user", "Admin", { maxAge: 60000 * 60, signed: true });

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

// Login route
app.post("/login", (req, res, next) => {
  // Authenticate user using Passport local strategy
  passport.authenticate("local", (err, user, info) => {
    // Handle authentication errors
    if (err) return next(err);

    // Return an error if authentication fails
    if (!user) {
      return res.status(401).json({ message: info?.message || "Login Failed" });
    }

    // Create a login session for the authenticated user
    req.logIn(user, (err) => {
      // Handle session login errors
      if (err) return next(err);

      // Send a success response after login
      return res.json({ message: "Login Successful", user });
    });
  })(req, res, next);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});

// Query Parameters - Filter Users
// localhost:3000/api/users?filter=user_name&value=de

// Query Parameters - Filter Products
// localhost:3000/api/products?filter=product_name&value=25
