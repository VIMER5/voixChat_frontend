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

export { type GetMyChatsResponse, type ChatInfo, type ChatMember, type ChatParticipant };
