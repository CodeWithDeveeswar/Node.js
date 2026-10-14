// 13. Post Request in Express JS App

// Extension: Thunder Client

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

const products = [
  { id: 1, product_name: "iPhone 16" },
  { id: 2, product_name: "iPhone 17" },
  { id: 3, product_name: "S24 Plus" },
  { id: 4, product_name: "S25 Ultra" },
];

app.get("/", (req, res) => {
  res.send({ msg: "Root" });
});

// Query Params

app.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;

  // console.log(filter, value);

  if (filter && value) {
    return res.send(
      users.filter((user) => user[filter].toLowerCase().includes(value)),
    );
  }
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

// Query Params

app.get("/api/products", (req, res) => {
  const {
    query: { filter, value },
  } = req;

  if (filter && value) {
    return res.send(
      products.filter((product) =>
        product[filter].toLowerCase().includes(value),
      ),
    );
  }
  res.send(products);
});

// Route Params

app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send({ msg: "Bad Request, Invalid ID" });
  }

  const product = products.find((product) => product.id === id);

  if (product) {
    return res.send(product);
  }
  return res.status(404).send({ msg: "User Not Found" });
});

// Post Request

app.use(express.json()); // Middleware

app.post("/api/users", (req, res) => {
  console.log(req.body);

  // return res.status(201).send(req.body);

  const { body } = req;

  const newUser = { id: users[users.length - 1].id + 1, ...body };

  users.push(newUser);

  return res.status(201).send(newUser);
});

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});

// localhost:3000/api/users?filter=user_name&value=de

// localhost:3000/api/products?filter=product_name&value=25
