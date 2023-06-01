import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import app from "./app.js";
import handleEvents from "./controllers/socketController.js";

dotenv.config();
// DlmUFlapkAGeR7vn
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  handleEvents(socket, io);
});

mongoose
  .connect(
    "mongodb+srv://salah:eGf1tQ77i3B27Yct@cluster0.3cug0e7.mongodb.net/chatty?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const port = 4000;
server.listen(port, () => {
  console.log("Server is running on port" + " " + port);
});
