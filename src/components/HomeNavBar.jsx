import Image from "next/image";
import { RiNotification2Line } from "react-icons/ri";
import FriendNotification from "./notifications/FriendNotification";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { logoutUser } from "@/store/user-slice";
import socket from "@/util/socket";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import AcceptNotification from "./notifications/AcceptNotification";
import DeclineNotification from "./notifications/DeclineNotification";
import {
  deleteUnseenNotifications,
  setNotifications,
  setUnseenNotifications,
} from "@/store/notification-slice";

const HomeNavBar = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const { notifications, unseenNotifications } = useSelector(
    (state) => state.notification
  );
  // const [unseenNotifications, setUnseenNotifications] = useState([]);
  const dispatch = useDispatch();

  console.log(notifications);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const req = await axios.get(
          "http://localhost:4000/api/v1/notifications/",
          { withCredentials: true }
        );

        const notifications = req.data.data.notifications.map((not) => ({
          id: not._id,
          type: not.type,
          sentDate: not.sentDate,
          sender: { username: not.sender.username, id: not.sender._id },
          isSeen: not.isSeen,
        }));

        dispatch(setNotifications(notifications));
        dispatch(setUnseenNotifications(notifications));
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();

    socket.on("send-notification", (msg) => {
      dispatch(setNotifications([msg]));
      console.log("msg", msg);
      dispatch(setUnseenNotifications([msg]));
    });
  }, []);

  console.log("no", notifications);

  const logoutHandler = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/users/logout", {
        withCredentials: true,
      });
      dispatch(logoutUser());
      socket.emit("user-disconnected", { userId: user.id });
      router.push("/en/login");
    } catch (err) {
      console.log(err);
    }
  };

  const updateUnseenNotifications = async () => {
    try {
      await axios.patch(
        "http://localhost:4000/api/v1/notifications/updateUnseenNotifications",
        {},
        { withCredentials: true }
      );
      dispatch(deleteUnseenNotifications());
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
            <label
              tabindex="0"
              className="btn btn-ghost"
              onClick={updateUnseenNotifications}
            >
              <div class="indicator">
                {/* Notification Badge */}
                {unseenNotifications.length === 0 ? null : (
                  <span class="indicator-item badge badge-primary scale-90">
                    {unseenNotifications.length}
                  </span>
                )}
                <RiNotification2Line size={25} />
              </div>
            </label>
            <ul
              tabindex="0"
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-96 h-80 overflow-y-scroll"
            >
              <li>
                {notifications.length === 0 ? (
                  <p>No notifications</p>
                ) : (
                  notifications.map((not, i) => {
                    if (not.type === "Friend") {
                      console.log("ZEBI", not.id, not);
                      return (
                        <FriendNotification
                          key={not.id}
                          sender={not.sender}
                          sentDate={not.sentDate}
                          notificationId={not.id}
                        ></FriendNotification>
                      );
                    }

                    if (not.type === "Decline") {
                      console.log("ZEBI", not.id, not);
                      return (
                        <DeclineNotification
                          key={not.id}
                          sender={not.sender}
                          sentDate={not.sentDate}
                          notificationId={not.id}
                        ></DeclineNotification>
                      );
                    }

                    if (not.type === "Accept") {
                      return (
                        <AcceptNotification
                          key={not.id}
                          sender={not.sender}
                          sentDate={not.sentDate}
                          notificationId={not.id}
                        ></AcceptNotification>
                      );
                    }
                  })
                )}
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
