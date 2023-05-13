import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import app from "./app.js";
import handleEvents from "./controllers/chatController.js";

dotenv.config();
// DlmUFlapkAGeR7vn
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  handleEvents(socket, io);
});

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log("Server is running on port" + " " + port);
});
