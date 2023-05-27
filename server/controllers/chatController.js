import User from "../models/userModel.js";

const handleEvents = (socket, io) => {
  /////////////////////////////
  console.log("con", socket.id);
  socket.on("user-connected", async (data) => {
    const user = await User.findById(data.userId).populate({
      path: "friends",
      select: "-friends",
    });
    user.isConnected = true;
    user.socketId = socket.id;
    user.save();
    // console.log(user.username);
    // console.log("MINE", socket.id);
    user.friends.forEach((friend, i) => {
      console.log("HAAAAADI", friend.socketId);
      friend.socketId &&
        io.to(friend.socketId).emit("friend-connected", user._id);
    });
  });

  socket.on("user-disconnected", async (data) => {
    const user = await User.findById(data.userId).populate({
      path: "friends",
      select: "-friends",
    });
    console.log("user disconnected", user);
    user.isConnected = false;
    user.socketId = undefined;
    user.save();
    // console.log(user.username);
    // console.log("MINE", socket.id);
    user.friends.forEach((friend, i) => {
      console.log("HAAAAADI", friend.socketId);
      friend.socketId &&
        io.to(friend.socketId).emit("friend-disconnected", user._id);
    });
  });

  socket.on("friend-notification", async (data) => {
    console.log("Data", data);
    const receiver = await User.findById(data.receiver);
    const sender = await User.findById(data.sender);

    console.log("Receiver", receiver);
    receiver.socketId &&
      io.to(receiver.socketId).emit("send-notification", {
        id: data._id,
        sender: { username: sender.username, id: sender._id },
        sentDate: data.sentDate,
        type: data.type,
        isSeen: data.isSeen,
      });
  });

  socket.on("response-friend", async (data) => {
    const user = await User.findById(data.id);
    console.log("SENT");
    const sender = await User.findById(data.sender);

    console.log(sender);
    if (user.socketId) {
      io.to(user.socketId).emit("send-notification", {
        id: data._id,
        type: data.type,
        sender: { username: sender.username, id: sender._id },
        sentDate: data.sentDate,
        isSeen: data.isSeen,
      });
    }
  });

  socket.on("send-message", async (data) => {
    const user = await User.findById(data.receiver);

    console.log(user);

    if (user.socketId) {
      io.to(user.socketId).emit("get-message", data);
    }
  });

  socket.on("send-message-notification", async (data) => {
    const user = await User.findById(data);

    if (user.socketId) {
      io.to(user.socketId).emit("get-message-notification", true);
    }
  });

  socket.on("message-seen", async (data) => {
    console.log(data);
    const user = await User.findById(data);

    if (user.socketId) {
      io.to(user.socketId).emit("get-message-seen", true);
    }
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

  socket.on("disconnect", async (data) => {
    console.log("DISCO", socket.id);
    const user = await User.findOne({ socketId: socket.id }).populate({
      path: "friends",
      select: "-friends",
    });

    if (user) {
      user.isConnected = false;
      user.socketId = undefined;
      user.save();
      console.log(user);

      user.friends.forEach((friend, i) => {
        console.log("HAAAAADI", friend.socketId);
        friend.socketId &&
          io.to(friend.socketId).emit("friend-disconnected", user._id);
      });
    }
  });
};
// io.on("connection", );

export default handleEvents;
