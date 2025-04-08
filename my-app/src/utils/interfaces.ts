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

  export interface User {
    id: number;
    email: string;
  }

  export interface UserListPanelProps {
    userList: ChatInterfaces.User[];
    selectUser: (user: ChatInterfaces.User) => void;
    selectedUser: ChatInterfaces.User | null;
  }
}
