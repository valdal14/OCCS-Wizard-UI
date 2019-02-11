require("dotenv").config();
const express = require("express");
const serveStatic = require("serve-static");
const bodyParser = require("body-parser");

const app = express();

// Get - Middleware Serve up public/views folder
app.use(
  "/",
  serveStatic("./public/", { index: ["index.html", "default.htm"] })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(process.env.PORT, function() {
  console.log("Server Started at port " + process.env.PORT);
});
