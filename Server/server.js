const express = require("express");
const { connect } = require("./util/db");
const userRouter = require("./router/user.route");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;
app.use(cors());

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//mongose
connect()
  .then((_) => console.log("connect"))
  .catch((err) => console.log(err));

app.use(userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
