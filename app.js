require("dotenv").config();
const express = require("express");
const serveStatic = require("serve-static");
const bodyParser = require("body-parser");
const wizardController = require("./wizardController");

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

app.post("/downloadProject", function(req, res) {
  wizardController(req, res);
});

app.listen(process.env.PORT, function() {
  console.log("Server Started at port " + process.env.PORT);
});
