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

// create server state
const messages = [];
const users = [];

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
  socket.on("join", (userName) => {
    console.log("Client Logged In " + socket.id + " as " + userName);
    users.push({ name: userName, id: socket.id });
    socket.broadcast.emit("newUser", userName);
  });

  socket.on("message", (message) => {
    console.log("Message from " + socket.id, message);
    messages.push(message);
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("users", users);
    let removedUser;
    users.forEach((user, index) => {
      if (user.id === socket.id) {
        removedUser = users.splice(index, 1);
      }
    });
    try {
      console.log(
        removedUser.name + " connected with " + socket.id + " has left"
      );
      socket.broadcast.emit("removeUser", removedUser.name);
    } catch (error) {
      console.log(
        "User from socket.id: " + socket.id + " has left",
        "They were not registered in users"
      );
    }
  });
});
