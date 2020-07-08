const express = require("express");
const app = express();
const port = process.env.PORT || "8080";

app.get("/", (_, res) => res.send("hello from root"));

app.listen(port, () => console.log(`Listening on ${port}`));
