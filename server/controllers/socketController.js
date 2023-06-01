import User from "../models/userModel.js";

const handleEvents = (socket, io) => {
  /////////////////////////////
  socket.on("user-connected", async (data) => {
    const user = await User.findById(data.userId).populate({
      path: "friends",
      select: "-friends",
    });
    user.isConnected = true;
    user.socketId = socket.id;
    user.disconnectedAt = undefined;

    user.save();

    user.friends.forEach((friend, i) => {
      friend.socketId &&
        io.to(friend.socketId).emit("friend-connected", user._id);
    });
  });

  socket.on("user-disconnected", async (data) => {
    const user = await User.findById(data.userId).populate({
      path: "friends",
      select: "-friends",
    });
    user.isConnected = false;
    user.socketId = undefined;
    user.disconnectedAt = Date.now();
    user.save();
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
    const sender = await User.findById(data.sender);

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
    const user = await User.findById(data);

    if (user.socketId) {
      io.to(user.socketId).emit("get-message-seen", true);
    }
  });

  socket.on("disconnect", async (data) => {
    const user = await User.findOne({ socketId: socket.id }).populate({
      path: "friends",
      select: "-friends",
    });

    if (user) {
      user.isConnected = false;
      user.socketId = undefined;
      user.disconnectedAt = Date.now();

      user.save();

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
