import { Router } from "express";
import { getUserIndexById, getParamsId } from "../utils/middlewares.mjs";
import { users } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { User } from "../mongoose/schema/user.mjs";
import { hashPassword } from "../utils/helper.mjs";

const router = Router();

// Query Params
router.get("/api/users", (req, res) => {
  // Display signed cookies from the request
  console.log(req.signedCookies);

  // Check Admin access using the signed cookie
  if (req.signedCookies.user && req.signedCookies.user === "Admin") {
    const {
      query: { filter, value },
    } = req;

    if (filter && value) {
      return res.send(
        users.filter((user) => user[filter].toLowerCase().includes(value)),
      );
    }
    return res.send(users);
  } else {
    return res.send({
      msg: "You are not an Admin / You don't have the right cookie",
    });
  }
});

// Route Params
router.get("/api/users/:id", getParamsId, (req, res) => {
  const id = req.id;

  const user = users.find((user) => user.id === id);

  if (user) {
    return res.send(user);
  }
  return res.status(404).send({ msg: "User Not Found" });
});

// Post Request
router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    // Validate the request data
    const result = validationResult(req);

    // Check for validation errors
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }

    // Extract validated data from the request
    const body = matchedData(req);

    // Hash the password before saving it to the database
    body.password = hashPassword(body.password);

    // Create a new user document
    const newUser = new User(body);

    try {
      // Save the user to the database
      const savedUser = await newUser.save();

      return res.status(201).send(savedUser);
    } catch (err) {
      // Handle database errors
      console.log(err);

      return res.status(400).send({ msg: "User not Saved" });
    }
  },
);

// Put Request (complete update)
router.put("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;

  const { body } = req;

  users[userIndex] = { id: id, ...body };

  return res.status(200).send({ msg: "User Updated" });
});

// Patch Request
router.patch("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;

  const { body } = req;

  users[userIndex] = { ...users[userIndex], ...body };

  return res.sendStatus(200);
});

// Delete Request
router.delete("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;

  console.log(userIndex);

  users.splice(userIndex, 1);

  res.sendStatus(200);
});

export default router;
