const express = require("express");
const app = express();
const PORT = 3000;
const fetch = require("node-fetch");


app.use(express.static("static"));

app.get("/data", (req, res) => {
  fetch("https://pastebin.com/raw/BmA8B0tY").then(a =>
    a.text().then(a => res.json(a.split("\r\n")))
  );
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
