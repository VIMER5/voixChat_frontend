interface GetMyChatsResponse {
  login: string;
  myChat: ChatInfo[];
}

interface ChatInfo {
  id: number;
  type: "private" | "group";
  name: string;
  avatar: string;
  chatMembers: ChatMember[];
  _ChatParticipant: ChatParticipant;
  _Messages?: Message[];
}

interface ChatMember {
  username: string;
  avatar: string;
  id: number;
}

interface ChatParticipant {
  lastReadMsgId: number;
  updatedAt: Date;
}

interface Message {
  id: number;
  content: string;
  type: any;
  createdAt: Date;
  updatedAt: Date;
  _User: {
    id: number;
    username: string;
    avatar: string | null;
  };
}

export { type GetMyChatsResponse, type ChatInfo, type ChatMember, type ChatParticipant, type Message };
