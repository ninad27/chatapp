import { RefObject, useEffect, useRef } from "react";

import { getCurrentUserEmail } from "../utils/userService";

import UserMessage from "./userMessage";
import ResponseMessage from "./responseMessage";
import { ChatInterfaces } from "../utils/interfaces";

export default function Messages({ messages }: { messages: ChatInterfaces.message[] }) {
  const email = getCurrentUserEmail();
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
        message.from === email ? (
          <UserMessage key={index} text={message.message} />
        ) : message.to === email ? (
          <ResponseMessage key={index} text={message.message} />
        ) : null
      )}
      <div id={"el"} ref={el} />
    </div>
  );
}
