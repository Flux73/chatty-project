import ChatMessageFriend from "@/components/chat/ChatMessageFriend";
import ChatMessageUser from "@/components/chat/ChatMessageUser";
import useFetchMe from "@/hooks/useFetchMe";
import { deleteUnseenMessages } from "@/store/chat-slice";
import { setRouterPage } from "@/store/user-slice";
import socket from "@/util/socket";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { unseenMessages } = useSelector((state) => state.chat);
  const [friend, setFriend] = useState(null);
  const [eventConnected, setEventConnected] = useState(false);
  const [eventDisconnected, setEventDisconnected] = useState(false);
  const containerChatRef = useRef(null);
  const dispatch = useDispatch();
  useFetchMe();

  console.log(router);

  useEffect(() => {
    if (!router.isReady) return;
    // dispatch(setCurrentPageRoute(router.route));
    dispatch(deleteUnseenMessages());
    socket.emit("message-seen", router.query.userId);
    // socket.emit("");
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;
    socket.on("friend-connected", (msg) => {
      if (msg !== router.query.userId) return;
      setEventConnected(true);
      setEventDisconnected(false);
    });
    socket.on("friend-disconnected", (msg) => {
      if (msg !== router.query.userId) return;
      setEventConnected(false);
      setEventDisconnected(true);
    });
    socket.on("get-message", async (data) => {
      setChat((prev) => [...prev, data]);
      dispatch(deleteUnseenMessages());
      await axios.patch(
        `http://localhost:4000/api/v1/chats/updateIsSeen/${router.query.userId}`,
        {},
        { withCredentials: true }
      );

      socket.emit("message-seen", router.query.userId);
    });

    socket.on("get-message-seen", (msg) => {
      setChat((prev) => {
        return prev.map((el, i, arr) => {
          if (i + 1 === arr.length) {
            return { ...el, isSeen: true };
          }

          return el;
        });
      });
    });

    // dispatch(setRouterPage(router.route));

    return () => {
      socket.off("get-message");
      socket.off("friend-disconnected");
      socket.off("friend-connected");
      dispatch(setRouterPage(null));
    };
  }, [router.isReady]);

  console.log(chat);
  // useEffect(() => {}, []);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchChatData = async () => {
      try {
        await axios.patch(
          `http://localhost:4000/api/v1/chats/updateIsSeen/${router.query.userId}`,
          {},
          { withCredentials: true }
        );
        const req = await axios.get(
          `http://localhost:4000/api/v1/chats/${router.query.userId}`,
          { withCredentials: true }
        );
        const friend = await axios.get(
          `http://localhost:4000/api/v1/users/${router.query.userId}`,
          { withCredentials: true }
        );

        console.log(containerChatRef.current);

        setFriend(friend.data.user);
        setChat(req.data.data);
        console.log(req.data.data);
        setLoading(false);
        containerChatRef.current.scrollTop =
          containerChatRef.current.scrollHeight;
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    fetchChatData();
  }, [router.isReady]);

  const sendMessageHandler = async (e) => {
    try {
      e.preventDefault();

      if (!message) return;

      const req = await axios.post(
        `http://localhost:4000/api/v1/chats/${router.query.userId}`,
        { message },
        { withCredentials: true }
      );

      socket.emit("send-message", req.data.data);
      socket.emit("send-message-notification", router.query.userId);
      setChat((prev) => [...prev, req.data.data]);
      setMessage("");
      containerChatRef.current.scrollTop =
        containerChatRef.current.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex flex-col h-screen">
      <header className="px-7 py-7 border-b-2 border-neutral-content border-opacity-30">
        <Link href="/en/home" className="mb-8 block">
          <RiArrowLeftLine size={29} />
        </Link>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex gap-4">
            <div
              className={`avatar  ${
                eventDisconnected
                  ? ""
                  : eventConnected || friend.isConnected
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
            <div className="flex flex-col gap-2 justify-center">
              <span className="text-xl font-semibold">{friend.username}</span>
              <span className="opacity-50">
                {eventDisconnected
                  ? "Active 1h ago"
                  : eventConnected || friend.isConnected
                  ? "Active"
                  : "Active 1h ago"}
              </span>
            </div>
          </div>
        )}
      </header>
      <div ref={containerChatRef} className="grow px-5 py-3 overflow-y-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          chat.map((msg, i, arr) =>
            msg.sender === user.id ? (
              i + 1 === arr.length ? (
                <ChatMessageUser
                  key={msg._id}
                  id={msg._id}
                  message={msg.message}
                  sentDate={msg.sentDate}
                  isDeleted={msg.isDeleted}
                  isSeen={msg.isSeen}
                ></ChatMessageUser>
              ) : (
                <ChatMessageUser
                  key={msg._id}
                  id={msg._id}
                  message={msg.message}
                  sentDate={msg.sentDate}
                  isDeleted={msg.isDeleted}
                ></ChatMessageUser>
              )
            ) : (
              <ChatMessageFriend
                key={msg._id}
                id={msg._id}
                message={msg.message}
                sentDate={msg.sentDate}
                isDeleted={msg.isDeleted}
              ></ChatMessageFriend>
            )
          )
        )}
      </div>
      <div className="px-5 py-8">
        <form>
          <div className="flex border-2 border-neutral-content border-opacity-30 rounded-full pr-5">
            <input
              type="text"
              value={message}
              className="input focus:outline-none w-full rounded-full"
              placeholder="Message..."
              onChange={(e) => setMessage(e.target.value)}
            />
            {!message ? (
              <button
                className="font-medium disabled:text-neutral-content disabled:opacity-70"
                disabled
              >
                send
              </button>
            ) : (
              <button
                onClick={sendMessageHandler}
                className="text-primary font-medium"
              >
                send
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
