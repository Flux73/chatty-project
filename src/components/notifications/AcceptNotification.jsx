import { deleteNotification } from "@/store/notification-slice";
import formatDate from "@/util/formatDate";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

const AcceptNotification = ({ notificationId, sender, sentDate }) => {
  const dispatch = useDispatch();

  const deleteNotificationHandler = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/notifications/${notificationId}`,
        { withCredentials: true }
      );
      dispatch(deleteNotification({ id: notificationId }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <div tabindex="0" className="avatar">
        <div className="mask mask-squircle cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
          <Image
            src="/imgs/profile.jpg"
            width={50}
            height={50}
            alt="Profile Picture"
          />
        </div>
      </div>
      <div className="flex flex-col mr-auto">
        <span className="font-bold">{sender.username}</span>
        <p className="">
          Accepted your friend request{" "}
          <span className="opacity-70">{formatDate(sentDate)}</span>
        </p>
      </div>
      <div>
        <button
          onClick={deleteNotificationHandler}
          className="btn btn-ghost btn-sm"
        >
          <RiCloseLine size={27}></RiCloseLine>
        </button>
      </div>
    </div>
  );
};

export default AcceptNotification;
