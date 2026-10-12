// 5. Client & Server in Node.js

const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Request Made");
});

server.listen(3000, "localhost", () => {
  console.log("Server is Listening");
});
