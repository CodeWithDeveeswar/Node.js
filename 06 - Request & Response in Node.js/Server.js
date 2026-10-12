// 6. Request & Response in Node.js

const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Request Made");
  // console.log(req);
  console.log(req.url);
  console.log(req.method);

  // res.setHeader("Content-Type", "text/plain");
  // res.write("Subscribe to code io");
  // res.write("Please do");
  // res.end();

  res.setHeader("Content-Type", "text/html");
  res.write("<head><title>HTTP Request and Response</title></head>");
  res.write("<h1>Subscribe to code io</h1>");
  res.write("<h4>Please do</h4>");
  res.end();
});

server.listen(3000, "localhost", () => {
  console.log("Server is Listening");
});
