// 11. Route Params in Express JS App

import express from "express";

const app = express();

const PORT = 3000;

const users = [
  { id: 1, user_name: "Devesh" },
  { id: 2, user_name: "Akilan" },
  { id: 3, user_name: "Sentamizh" },
  { id: 4, user_name: "Jaiyanth" },
  { id: 5, user_name: "Pavalan" },
];

app.get("/", (req, res) => {
  res.send({ msg: "Root" });
});

app.get("/api/users", (req, res) => {
  res.send(users);
});

// Route Params

app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send({ msg: "Bad Request, Invalid ID" });
  }

  const user = users.find((user) => user.id === id);

  if (user) {
    return res.send(user);
  }
  return res.status(404).send({ msg: "User Not Found" });
});

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
