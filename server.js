const express = require("express");
const path = require("path");
const fs = require("fs");
const data = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware functions that make data available in the req object:
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

app.get("/send", (req, res) =>
  res.sendFile(path.join(__dirname, "public/sendFile.html"))
);

app.get("/routes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/routes.html"))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
