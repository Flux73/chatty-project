import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import socket from "@/util/socket";

const Me = () => {
  const router = useRouter();
  const [notification, setNotifications] = useState([]);

  useEffect(() => {
    console.log("READ");
    socket.on("send-notification", (msg) => {
      console.log("Receive Notification");
      setNotifications((prev) => [msg, ...prev]);
    });
  }, []);

  const sb = async (e) => {
    try {
      const req = await axios.get("http://localhost:4000/api/v1/users/logout", {
        withCredentials: true,
      });
      console.log("disconnected");

      if (req.data.status === "success") {
        socket.emit("user-disconnected", { userId: req.data.data.user._id });
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fn = async (e) => {
    try {
      const req = await axios.post(
        "http://localhost:4000/api/v1/notifications/sendFriendRequest/64345a5a783beab4bdb793d0",
        { type: "Friend" },
        { withCredentials: true }
      );

      socket.emit("notification", {
        sender: "643494d4b4c80e21f9f19178",
        receiver: "64345a5a783beab4bdb793d0",
        type: "Friend",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Welcome, Salah</h1>
      <button onClick={sb} className="btn btn-error">
        Log Out
      </button>
      <br />
      <button onClick={fn} className="btn btn-secondary">
        Send Friend Request
      </button>
      <br />
      <p className="text-4xl font-bold text-accent">{notification.length}</p>
    </div>
  );
};

export default Me;
