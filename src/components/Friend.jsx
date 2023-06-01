import formatDate from "@/util/formatDate";
import socket from "@/util/socket";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Friend = ({ username, id, isConnected, disconnectedAt }) => {
  const [eventConnected, setEventConnected] = useState(false);
  const [eventDisconnected, setEventDisconnected] = useState(false);
  console.log(id, eventConnected);
  useEffect(() => {
    socket.on("friend-connected", (msg) => {
      if (msg !== id) return;
      setEventConnected(true);
      setEventDisconnected(false);
    });
    socket.on("friend-disconnected", (msg) => {
      if (msg !== id) return;
      setEventConnected(false);
      setEventDisconnected(true);
    });
  }, []);

  return (
    <li>
      <Link
        href={`/en/home/direct/${id}`}
        className="py-3 px-7 flex gap-6 cursor-pointer hover:bg-base-300"
      >
        <div
          className={`avatar ${
            eventDisconnected
              ? ""
              : eventConnected || isConnected
              ? "online"
              : ""
          } z-0`}
        >
          <div className="mask mask-squircle">
            <Image
              src="/imgs/profile_pic.jpg"
              width={50}
              height={50}
              alt="Profile Picture"
            ></Image>
          </div>
        </div>
        <div className="flex flex-col justify-around">
          <h2 className="font-bold text-lg">{username}</h2>
          <p className="opacity-75">
            {eventDisconnected
              ? `Active ${formatDate(disconnectedAt)}`
              : eventConnected || isConnected
              ? "Active now"
              : `Active ${formatDate(disconnectedAt)}`}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Friend;
