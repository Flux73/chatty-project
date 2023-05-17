import Friend from "@/components/Friend";
import HomeNavBar from "@/components/HomeNavBar";
import MobileNav from "@/components/MobileNav";
import isAuthenticated from "@/hoc/isAuthenticated";
import useFetchMe from "@/hooks/useFetchMe";
import axios from "axios";
import { useEffect, useState } from "react";

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
      <MobileNav active="chats"></MobileNav>
    </div>
  );
};

export default isAuthenticated(home);

home.requireAuth = true;
