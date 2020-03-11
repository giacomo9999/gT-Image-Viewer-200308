const express = require("express");
const app = express();
const PORT = 3000;
const fetch = require("node-fetch");

// Use 'static' folder to serve HTML, CSS, and JS files to browser
app.use(express.static("static"));

// Fetch data from Pastebin URL and send it as JSON response object
app.get("/data", (req, res) => {
  fetch("https://pastebin.com/raw/BmA8B0tY").then(a =>
    a.text().then(a => res.json(a.split("\r\n")))
  );
});

// Listen for requests
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
