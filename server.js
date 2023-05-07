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
  fs.readFile(path.join(__dirname, "db", "db.json"), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST route to add note
app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db", "db.json"), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    notes.push(newNote);
    fs.writeFile(
      path.join(__dirname, "db", "db.json"),
      JSON.stringify(notes),
      (err) => {
        if (err) throw err;
        res.json(newNote);
      }
    );
  });
});

// delete route
app.delete("/api/notes/:id",(req,res)=>{
    
})


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
