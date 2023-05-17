import Image from "next/image";
import { RiNotification2Line } from "react-icons/ri";
import FriendNotification from "./FriendNotification";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { logoutUser } from "@/store/user-slice";
import socket from "@/util/socket";
import Link from "next/link";

const HomeNavBar = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/users/logout", {
        withCredentials: true,
      });
      dispatch(logoutUser());
      // console.log("OUT");
      socket.emit("user-disconnected", { userId: user.id });
      router.push("/en/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar bg-base-100 px-8 py-8">
      <ul className="flex grow gap-4">
        <li className="mr-auto">
          <Image
            src="/imgs/Asset 3.svg"
            width={140}
            height={140}
            alt="logo"
          ></Image>
        </li>
        <li>
          <div className="dropdown dropdown-end">
            <label tabindex="0" className="btn btn-ghost">
              <div class="indicator">
                {/* Notification Badge */}
                {/* <span class="indicator-item badge badge-primary scale-90">
                    5
                  </span> */}
                <RiNotification2Line size={25} />
              </div>
            </label>
            <ul
              tabindex="0"
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-96 h-80 overflow-y-scroll"
            >
              <li>
                <FriendNotification></FriendNotification>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="dropdown dropdown-end w-14 h-auto">
            <div tabindex="0" className="avatar">
              <div className=" mask mask-squircle cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src="/imgs/profile.jpg"
                  width={96}
                  height={96}
                  alt="Profile Picture"
                ></Image>
              </div>
            </div>
            <ul
              tabindex="0"
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/en/profile/me">Profile</Link>
              </li>
              <li>
                <Link href="/en/settings">Settings</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNavBar;
