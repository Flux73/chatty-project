import { useRouter } from "next/router";
import Link from "next/link";
import HomeNavBar from "@/components/HomeNavBar";
import MobileNav from "@/components/MobileNav";
import useFetchMe from "@/hooks/useFetchMe";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import socket from "@/util/socket";
import dynamic from "next/dynamic";

const DynamicMobileNav = dynamic(() => import("@/components/MobileNav"), {
  ssr: false,
});

const Page = () => {
  const router = useRouter();
  const { user: me } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingFriend, setLoadingFriend] = useState(false);
  const [isFriendPending, setIsFriendPending] = useState({});
  const [isFriend, setIsFriend] = useState(null);
  useFetchMe();

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.id === "me") {
      setUser(me);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const req = await axios.get(
          `http://localhost:4000/api/v1/users/${router.query.id}`,
          {
            withCredentials: true,
          }
        );

        if (!req.data.user) throw Error("User was not found");
        setUser(req.data.user);

        const req2 = await axios.get(`http://localhost:4000/api/v1/friends/`, {
          withCredentials: true,
        });
        setIsFriend(
          req2.data.data.friends.some(
            (friend) => friend._id === router.query.id
          )
        );

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    })();
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.id === "me") return;
    (async () => {
      try {
        const req = await axios.get(
          `http://localhost:4000/api/v1/notifications/isSendFriendRequest/${router.query.id}`,
          {
            withCredentials: true,
          }
        );

        if (req.data.data === true || req.data.data === false)
          setIsFriendPending({ sender: req.data.data });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [router.isReady]);

  const addFriendHandler = async (e) => {
    try {
      e.preventDefault();
      setLoadingFriend(true);

      const req = await axios.post(
        `http://localhost:4000/api/v1/notifications/sendFriendRequest/${user._id}`,
        {},
        { withCredentials: true }
      );

      socket.emit("friend-notification", req.data.data.notification);

      setIsFriendPending({ sender: true });
      setLoadingFriend(false);
    } catch (err) {
      console.error(err);
      setLoadingFriend(false);
    }
  };

  console.log("Pending", isFriendPending);

  return (
    <div className="h-screen">
      <HomeNavBar></HomeNavBar>
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="px-8">
            <header className="flex gap-4 flex-wrap">
              <div class="avatar">
                <div class="mask mask-squircle">
                  <Image src="/imgs/profile.jpg" width={100} height={100} />
                </div>
              </div>
              <div className="flex flex-col gap-3 mr-auto">
                <div className="flex gap-3 items-center">
                  <h1 className="text-2xl font-bold text-neutral-content">
                    {user.username}
                  </h1>
                  <div className="badge">{`${String(
                    user.gender
                  )[0].toUpperCase()}${String(user.gender).slice(1)}`}</div>
                </div>
                <p className="self-baseline text-neutral-content">
                  <span className="text-lg font-semibold">
                    {new Date().getFullYear() -
                      new Date(user.birthDate).getFullYear()}
                  </span>{" "}
                  years old
                </p>
              </div>
              {router.query.id !== "me" ? (
                isFriend === true ? (
                  <div className="basis-full sm:basis-auto dropdown dropdown-end h-auto">
                    <button className="btn btn-primary btn-block">
                      Friend Added
                    </button>
                    <ul
                      tabindex="0"
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button>Remove Friend</button>
                      </li>
                    </ul>
                  </div>
                ) : Object.keys(isFriendPending).length === 0 ? (
                  <form
                    onSubmit={addFriendHandler}
                    className="basis-full sm:basis-auto"
                  >
                    <button className="btn btn-primary btn-block">
                      {loadingFriend ? "Loading..." : "Add Friend"}
                    </button>
                  </form>
                ) : isFriendPending.sender ? (
                  <div className="basis-full sm:basis-auto">
                    <button className="btn btn-primary btn-block">
                      Friend Request was sent
                    </button>
                  </div>
                ) : (
                  <div className="basis-full sm:basis-auto">
                    <button className="btn btn-primary btn-block">
                      Accept Friend Request
                    </button>
                    <button className="btn btn-primary btn-block">
                      Decline Friend Request
                    </button>
                  </div>
                )
              ) : (
                <div className="basis-full sm:basis-auto">
                  <Link
                    href="/en/settings"
                    className="btn btn-secondary btn-block"
                  >
                    Edit
                  </Link>
                </div>
              )}
            </header>
            <div className="divider"></div>
            <div>
              <h2 className="text-2xl font-bold mb-5">Bio 🔥</h2>
              <p className="text-neutral-content font-medium text-lg text-opacity-70 leading-relaxed">
                Hey there! I'm Samantha Hayes, a travel-loving, game-playing
                developer. I'm all about exploring the world and immersing
                myself in exciting gaming adventures. As a software developer, I
                enjoy the challenge of creating innovative solutions through
                coding. When I'm not working, you'll find me planning my next
                travel escapade or diving into captivating virtual worlds. I
                believe in the power of technology to enhance our lives, and I
                embrace the joy of both travel and gaming. Let's embark on
                amazing journeys together, whether it's through lines of code or
                across breathtaking landscapes!
              </p>
            </div>
          </div>
        )}
      </main>
      <DynamicMobileNav disable={true}></DynamicMobileNav>
    </div>
  );
};

export default Page;
