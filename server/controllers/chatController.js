import User from "../models/userModel.js";

const users = [];

const addNewUser = (username, socketId) => {
  users.push({ username, socketId });
  console.log(users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return users.find((user) => user.username === username);
};
const handleEvents = (socket, io) => {
  /////////////////////////////
  console.log("con", socket.id);
  socket.on("user-connected", async (data) => {
    const user = await User.findById(data.userId);
    user.isConnected = true;
    user.socketId = socket.id;
    user.save();
    console.log(user.username);
    console.log("MINE", socket.id);
  });

  socket.on("user-disconnected", async (data) => {
    const user = await User.findById(data.userId);
    user.isConnected = false;
    user.socketId = undefined;
    user.save();
  });

  socket.on("notification", async (data) => {
    // console.log(data);
    const receiver = await User.findById(data.receiver);

    console.log("Receiver", receiver.socketId);
    io.to(receiver.socketId).emit(
      "send-notification",
      "Salah Send you a friend request"
    );
  });

  // console.log("New WebSocket connection...", socket.id);
  // socket.on("new-user", (username) => {
  //   addNewUser(username, socket.id);
  // });
  //   io.to.emit("123456", "Hello");
  // socket.on("chat-message", (msg) => {
  //   console.log("You sent: ", msg);
  //   io.emit("chat-message", msg);
  // });

  // socket.on("notification", async (msg) => {
  //   console.log(msg.id);
  //   const user = await User.findById(msg.id);
  //   console.log("SOCKET: ----------", io.sockets.sockets);
  //   io.to(user.socketId).emit("get-notification");
  // });

  // socket.emit("some-event", {
  //   someProperty: "some value",
  //   otherProperty: "other value",
  // });

  // socket.broadcast.emit("hi");

  socket.on("disconnect", () => {
    // removeUser(socket.id);
    console.log("user disconnected");
  });
};
// io.on("connection", );

export default handleEvents;
