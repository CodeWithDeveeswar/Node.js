import { users } from "./constants.mjs";

// Middleware to validate user ID and find the user's index
export const getUserIndexById = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send({ msg: "Bad Request, Invalid ID" });
  }

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).send({ msg: "User Not Found" });
  }

  req.userIndex = userIndex;

  next();
};

// Middleware to validate and extract ID from route parameters
export const getParamsId = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send({ msg: "Bad Request, Invalid ID" });
  }

  req.id = id;

  next();
};
