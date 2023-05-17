import socket from "@/util/socket";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Friend = ({ username, id, isConnected }) => {
  const [eventConnected, setEventConnected] = useState(false);
  const [eventDisconnected, setEventDisconnected] = useState(false);

  useEffect(() => {
    socket.on("friend-connected", () => {
      console.log("Friend is online");
      setEventConnected(true);
      setEventDisconnected(false);
    });
    socket.on("friend-disconnected", () => {
      console.log("Friend is offline");
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
              src="/imgs/profile.jpg"
              width={50}
              height={50}
              alt="Profile Picture"
            ></Image>
          </div>
        </div>
        <div className="flex flex-col justify-around">
          <h2 className="font-bold text-lg">{username}</h2>
          <p className="opacity-75">Hey , How are you doing!</p>
        </div>
      </Link>
    </li>
  );
};

export default Friend;
