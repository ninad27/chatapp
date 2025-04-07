import { ChatInterfaces } from "../utils/interfaces";

export default function ResponseMessage({ text }: ChatInterfaces.UserMessageProps) {
  return (
    <div className="message-container">
      <div className="bot-message">{text}</div>
    </div>
  );
}
