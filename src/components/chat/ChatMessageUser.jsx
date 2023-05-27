import React from "react";
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";

const ChatMessageUser = ({ id, message, sentDate, isDeleted, isSeen }) => {
  console.log(isSeen, "Iseen");
  return (
    <div className="chat chat-end">
      <div className="chat-header">
        sent <time className="text-xs opacity-50">{sentDate}</time>
      </div>
      <div className="chat-bubble chat-bubble-primary">{message}</div>
      {/* <div className="chat-footer opacity-50">Seen</div> */}
      <div className="chat-footer opacity-50">
        {/* <RiCheckLine size={20} /> */}
        {isSeen === false ? <RiCheckDoubleLine size={20} /> : null}
        {isSeen === true ? "Seen" : null}
        {/* <RiCheckDoubleLine size={20} /> */}
        {/* Seen */}
      </div>
    </div>
  );
};

export default ChatMessageUser;
