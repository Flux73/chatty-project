import Friend from "@/components/Friend";
import HomeNavBar from "@/components/HomeNavBar";
import MobileNav from "@/components/MobileNav";
import isAuthenticated from "@/hoc/isAuthenticated";
import useFetchMe from "@/hooks/useFetchMe";
import { setUnseenMessages } from "@/store/chat-slice";
import socket from "@/util/socket";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const home = () => {
  const [friends, setFriends] = useState(null);
  const { routerPage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useFetchMe();

  useEffect(() => {
    (async () => {
      const req = await axios.get("http://localhost:4000/api/v1/friends/", {
        withCredentials: true,
      });
      const req2 = await axios.get(
        "http://localhost:4000/api/v1/chats/getUnseenMessages",
        {
          withCredentials: true,
        }
      );

      dispatch(setUnseenMessages(req2.data.data));

      setFriends(req.data.data.friends);
    })();

    socket.on("get-message-notification", (msg) => {
      console.log("YES DUDE", routerPage);
      dispatch(setUnseenMessages([msg]));
    });

    return () => {
      console.log("removed");
      socket.off("get-message-notification");
    };
  }, []);

  return (
    <div className="h-screen">
      <HomeNavBar></HomeNavBar>
      <main>
        <ul>
          {friends ? (
            friends.map((friend) => (
              <Friend
                username={friend.username}
                id={friend._id}
                isConnected={friend.isConnected}
              />
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </main>
      <MobileNav></MobileNav>
    </div>
  );
};

export default isAuthenticated(home);

home.requireAuth = true;
