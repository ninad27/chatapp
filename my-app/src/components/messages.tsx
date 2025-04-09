import { RefObject, useEffect, useRef } from "react";

import { getCurrentUserId } from "../utils/userService";

import UserMessage from "./userMessage";
import ResponseMessage from "./responseMessage";
import { ChatInterfaces } from "../utils/interfaces";

export default function Messages({ messages }: { messages: ChatInterfaces.message[] }) {
  const currentUserId = getCurrentUserId();
  const el: RefObject<HTMLDivElement | null> = useRef(null);
  useEffect(() => {
    if (!el?.current) {
      return;
    }
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });

  return (
    <div className="messages">
      {messages.map((message, index: number) =>
        message.from === currentUserId ? (
          <UserMessage key={index} text={message.message} />
        ) : message.to === currentUserId ? (
          <ResponseMessage key={index} text={message.message} />
        ) : null
      )}
      <div id={"el"} ref={el} />
    </div>
  );
}
