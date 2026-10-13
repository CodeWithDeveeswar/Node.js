// 8. NPM & Dependencies in Node.js

// ---------------------- Terminal 1 ----------------------

// Install Nodemon Globally
// Cmd: npm install -g nodemon

// Navigate to Project Folder
// Cmd: cd "D:\Node.js\08 - NPM & Dependencies in Node.js"

// Run Server with Nodemon
// Cmd: nodemon Server

// ---------------------- Terminal 2 ----------------------

// Navigate to Project Folder
// Cmd: cd "D:\Node.js\08 - NPM & Dependencies in Node.js"

// Initialize Node.js Project and Create package.json
// Cmd: npm init

// Install Lodash as a Dependency
// Cmd: npm install lodash

// --------------------------------------------------------

// Install Dependencies from package.json
// Cmd: npm install

// --------------------------------------------------------

const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  console.log(req.url);

  let path = "./docs/";

  if (req.url == "/") {
    path += "index.html";
    res.statusCode = 200;
  } else if (req.url == "/home") {
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  } else if (req.url == "/join") {
    path += "join.html";
    res.statusCode = 200;
  } else if (req.url == "/about") {
    path += "about.html";
    res.statusCode = 200;
  } else {
    path += "notFound.html";
    res.statusCode = 404;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err.message);
      res.end();
    } else {
      // res.write(data);
      // res.end();
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Server is Listening");
  console.log(_.random(15, 25));
});
