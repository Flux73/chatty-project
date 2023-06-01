import Friend from "@/components/Friend";
import HomeNavBar from "@/components/HomeNavBar";
import MobileNav from "@/components/MobileNav";
import isAuthenticated from "@/hoc/isAuthenticated";
import useFetchMe from "@/hooks/useFetchMe";
import socket from "@/util/socket";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const home = () => {
  const [friends, setFriends] = useState(null);
  useFetchMe();

  useEffect(() => {
    (async () => {
      const req = await axios.get("http://localhost:4000/api/v1/friends/", {
        withCredentials: true,
      });

      setFriends(req.data.data.friends);
    })();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <HomeNavBar></HomeNavBar>
      <main className="grow">
        <ul>
          {friends ? (
            friends.length === 0 ? (
              <p>No friends were found.</p>
            ) : (
              friends.map((friend) => (
                <Friend
                  username={friend.username}
                  id={friend._id}
                  isConnected={friend.isConnected}
                  disconnectedAt={friend.disconnectedAt}
                />
              ))
            )
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
