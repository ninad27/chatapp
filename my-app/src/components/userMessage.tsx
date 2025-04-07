import { ChatInterfaces } from "../utils/interfaces";

export default function UserMessage({ text }: ChatInterfaces.UserMessageProps) {
  return (
    <div className="message-container">
      <div className="user-message">{text}</div>
    </div>
  );
}
