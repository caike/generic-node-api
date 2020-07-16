const express = require("express");
const app = express();

app.get("/", (_, res) => res.json("hello from root"));

const authorizer = require("./lib/authorizer");

app.get("/protected", authorizer, (req, res) => {
  res.json(`hello, ${req.authToken.user}`);
});

module.exports = app;
