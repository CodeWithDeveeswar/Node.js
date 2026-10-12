// 3. File System in Node.js

// -------------------------------------------------------------------

// fs - file system

const fs = require("fs");

// -------------------------------------------------------------------

// mkdir - Create Folder

if (!fs.existsSync("./docs")) {
  fs.mkdir("./docs", (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Folder Created");
    }
  });

  console.log("Here Here");
}

// -------------------------------------------------------------------

// writeFile - Create and Write File

fs.writeFile("./docs/file.txt", "Subscribe to Code io", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("File Written");
  }
});

// -------------------------------------------------------------------

// readFile - Read File

if (fs.existsSync("./docs/file.txt")) {
  fs.readFile("./docs/file.txt", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(data.toString());
    }
  });
}

// -------------------------------------------------------------------

// unlink - Delete File

// if (fs.existsSync("./docs/file.txt")) {
//   fs.unlink("./docs/file.txt", (err) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log("File Deleted");
//     }
//   });
// }

// -------------------------------------------------------------------

// rmdir - Delete Folder

// if (fs.existsSync("./docs")) {
//   fs.rmdir("./docs", (err) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log("Folder Deleted");
//     }
//   });
// }
