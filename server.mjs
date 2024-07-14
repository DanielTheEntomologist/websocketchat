import express from "express";
import path from "path";
import cors from "cors";
import { Server as Socket } from "socket.io";

// set app and express settings
const app = express();

// set paths
const __dirname = path.resolve();
const staticPath = path.join(__dirname, "/client");

// set middleware
app.use(express.static(staticPath));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// create message log
const messages = [];

// set views
const views = {
  "": "index.html",
  index: "index.html",
  "index.html": "index.html",
};

// set routes
for (let key in views) {
  app.get("/" + String(key), (req, res) => {
    res.sendFile(path.join(__dirname, views[key]));
  });
}

app.use("*", (req, res) => {
  res.status(404);
});

const server = app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});

const io = new Socket(server);

io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);
  socket.on("message", (message) => {
    console.log("Oh, I've got something from " + socket.id);
    messages.push(message);
    console.log("message", message);
    socket.broadcast.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("Oh, socket " + socket.id + " has left");
  });
  console.log("I've added a listener on message and disconnect events \n");
});
