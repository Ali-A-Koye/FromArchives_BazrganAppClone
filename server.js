/* eslint-disable */
const dotenv = require("dotenv");
const app = require("./app");
const http = require("http").createServer(app);
const relations = require("./relations");

//
//
process.on("uncaughtException", err => {
  console.log((err.name, err.message));
  console.log("uncaughtException: SHUTTING DOWN...");
  process.exit(1);
});

const sequelize = require("./utils/database");

relations();

dotenv.config({ path: "./config.env" });

sequelize
  .sync()
  .then(result => {
    console.log("SQL database Connected");
  })
  .catch(err => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
const server = http.listen(port, () => {
  console.log(`website Running on Port ${port}...`);
});

//for error Promises in Server.js
process.on("unhandledRejection", err => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION: SHUTTING DOWN...");
  server.close(() => {
    process.exit(1);
  });
});
