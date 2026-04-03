export interface VoicesChannelsInfo {
  id: string;
  members: UserVoiceInfo[];
}

interface UserVoiceInfo {
  id: number;
  userName: string;
  avatar: string;
}
