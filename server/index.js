const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const { states } = require("./routers");

const app = express();

app.use("/api/states", states);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.redirect(process.env.HOME_URL);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
