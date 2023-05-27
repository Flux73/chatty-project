import { deleteNotification } from "@/store/notification-slice";
import socket from "@/util/socket";
import axios from "axios";
import Image from "next/image";
import { useDispatch } from "react-redux";

const FriendNotification = ({ sender, sentDate, notificationId }) => {
  const dispatch = useDispatch();

  const acceptFriendRequest = async () => {
    try {
      const req = await axios.post(
        `http://localhost:4000/api/v1/notifications/sendFriendRequest/${sender.id}`,
        {
          type: "Accept",
        },
        { withCredentials: true }
      );
      await axios.patch(
        `http://localhost:4000/api/v1/friends/${sender.id}`,
        {},
        { withCredentials: true }
      );

      dispatch(deleteNotification({ id: notificationId }));

      socket.emit("response-friend", {
        id: sender.id,
        ...req.data.data.notification,
      });
    } catch (err) {
      console.error(err);
    }
  };
  console.log("DEAD", notificationId);
  const declineFriendRequest = async () => {
    try {
      const req = await axios.post(
        `http://localhost:4000/api/v1/notifications/sendFriendRequest/${sender.id}`,
        {
          type: "Decline",
        },
        { withCredentials: true }
      );

      await axios.delete(
        `http://localhost:4000/api/v1/notifications/${notificationId}`,
        { withCredentials: true }
      );

      dispatch(deleteNotification({ id: notificationId }));

      // console.log(req.data.data.notification);
      socket.emit("response-friend", {
        id: sender.id,
        ...req.data.data.notification,
      });
    } catch (err) {
      console.error(err);
    }
  };

  console.log(sender.id, sender.username, sentDate);
  return (
    <div className="flex">
      <div tabindex="0" className="avatar">
        <div className="mask mask-squircle cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
          <Image
            src="/imgs/profile.jpg"
            width={50}
            height={50}
            alt="Profile Picture"
          ></Image>
        </div>
      </div>
      <div className="flex flex-col mr-auto">
        <span className="font-bold">{sender.username}</span>
        <p className="">
          Sent you a friend request{" "}
          <span className="opacity-70">{sentDate} ago</span>
        </p>
      </div>
      <div>
        <button
          onClick={acceptFriendRequest}
          className="btn btn-primary btn-sm"
        >
          Accept
        </button>
        <button onClick={declineFriendRequest} className="btn btn-sm">
          Decline
        </button>
      </div>
    </div>
  );
};

export default FriendNotification;
