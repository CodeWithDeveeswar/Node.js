// 2. Modules and Require in Node.js

// ----------------------------------------------------

// const imports = require("./data"); // Runs the file

// console.log(imports);
// console.log(imports.names);
// console.log(imports.ages);

// ----------------------------------------------------

const { names, ages } = require("./data");

console.log(names, ages);

// ----------------------------------------------------

// const os = require("os");

// console.log(os);
// console.log(os.homedir());
