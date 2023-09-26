const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

mongoose
  .connect(process.env.MONGODB_URL)
  .then((_) => console.log("connect"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
