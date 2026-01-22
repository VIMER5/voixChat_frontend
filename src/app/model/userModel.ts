export interface typeUserNotification {}

export interface typeServerNotification {}

export interface currentUserInfo {
  login: string;
  userName: string;
  email: string;
  avatar: string | null;
  status: string | null;
  emailConfirmed: boolean;
}
