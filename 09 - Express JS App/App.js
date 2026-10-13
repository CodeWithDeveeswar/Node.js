// 9. Express JS App

// npm install express

const exp = require("express");

const app = exp();

app.listen(3000);

app.get("/", (req, res) => {
  // res.send("<h1>Code IO</h1>");
  res.sendFile("./docs/index.html", { root: __dirname });
});

app.get("/join", (req, res) => {
  res.sendFile("./docs/join.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./docs/about.html", { root: __dirname });
});

app.get("/joinUS", (req, res) => {
  res.redirect("/join");
});

app.use((req, res) => {
  res.sendFile("./docs/notFound.html", { root: __dirname });
});
