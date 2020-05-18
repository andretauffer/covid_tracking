const express = require("express");
const path = require("path");
const { states } = require("./routers");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/states", states);

// // Handles any requests that don't match the ones above
// app.get("*", (req, res) => {
//   res.redirect(process.env.HOME_URL);
// });

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
