const express = require("express");
const app = express();

app.get("/", (_, res) => res.json("hello from root"));

module.exports = app;
