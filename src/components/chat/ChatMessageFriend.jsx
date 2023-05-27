import React from "react";

const ChatMessageFriend = ({ id, message, sentDate, isDeleted }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="/imgs/profile.jpg" />
        </div>
      </div>
      <div className="chat-header">
        sent <time className="text-xs opacity-50">{sentDate}</time>
      </div>
      <div className="chat-bubble">{message}</div>
    </div>
  );
};

export default ChatMessageFriend;
