// 4. Streams and Buffers in Node.js

// ---------------------------------------------------------------------

const fs = require("fs");

// ---------------------------------------------------------------------

// const readStream = fs.createReadStream("./Docs/HugeFile.txt");

// readStream.on("data", (buffer) => {
//   console.log("\nNew Buffer\n");
//   console.log(buffer.toString());
// });

// ---------------------------------------------------------------------

// const readStream = fs.createReadStream("./Docs/HugeFile.txt", {
//   encoding: "utf8",
// });

// readStream.on("data", (buffer) => {
//   console.log("\nNew Buffer\n");
//   console.log(buffer);
// });

// ---------------------------------------------------------------------

// const readStream = fs.createReadStream("./Docs/HugeFile.txt", {
//   encoding: "utf8",
// });

// const writeStream = fs.createWriteStream("./Docs/copyHugeFile.txt");

// readStream.on("data", (buffer) => {
//   writeStream.write("\nNew Buffer\n");
//   writeStream.write(buffer);
// });

// ---------------------------------------------------------------------

const readStream = fs.createReadStream("./Docs/HugeFile.txt", {
  encoding: "utf8",
});

const writeStream = fs.createWriteStream("./Docs/copyHugeFile.txt");

readStream.pipe(writeStream);
