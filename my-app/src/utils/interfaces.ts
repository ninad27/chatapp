export namespace ChatInterfaces {
  export interface message {
    from: string;
    to: string;
    message: string;
  }

  export interface MessageInputProps {
    onSend: (message: string) => void;
  }

  export interface UserMessageProps {
    text: string;
  }
}
