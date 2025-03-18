const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// serve static files from the "public" directory
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});

// listen for new socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // listen for 'input_message' event and broadcast it to all clients except the sender
  socket.on("input_message", (message) => {
    console.log("Received message:", message);
    socket.broadcast.emit("message", message); // emit the message to all other clients except the sender
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// start the server
server.listen(9000, () => {
  console.log("Server started at http://localhost:9000");
});
