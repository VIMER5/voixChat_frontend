export interface typeUserNotification {}

export interface typeServerNotification {}

export interface currentUserInfo {
  id: number;
  login: string;
  userName: string;
  email: string;
  avatar: string;
  status: string | null;
  emailConfirmed: boolean;
  role: "user" | "admin";
  isBanned: boolean;
}
