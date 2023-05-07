const fs = require("fs");
const express = require("express");
const path = require("path");
const data = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware functions that make data available in the req object:
// parse JSON body of POST request
app.use(express.json());
// serve static file in public dir
app.use(express.static(path.join(__dirname, "public")));
// access form data using req.body
app.use(express.urlencoded({ extended: true }));

// GET route to get list of notes
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    err
      ? res.status(500).send("Error reading database file")
      : res.json(JSON.parse(data));
    // console.log("Success: notes retrieved from database");
  });
});

// POST route to add note
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      res.status(500).send("Error reading database file.");
      throw err;
    }
    const notes = JSON.parse(data);
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    notes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) {
        res.status(500).send("Error writing to database file.");
        throw err;
      }
      console.log("Note added successfully!");
      res.status(200).send("Note added successfully!");
    });
  });
});

// delete route
app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading notes data.");
    }
    const notes = JSON.parse(data);
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    fs.writeFile("./db/db.json", JSON.stringify(filteredNotes), (err) => {
      if (err) {
        return res.status(500).send("Error writing notes data.");
      }
      console.log("Note deleted successfully!");
      res.send("Note deleted successfully!");
    });
  });
});

// route for root URL
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// route to notes.html page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

// heroku login in terminal
// type in heroku create
// git push herkou main
// go to heroku itself and go to open app
// git add, git commit git push and git push heroku main
