import { type TypeStatusProps } from "@model/userStatusModel";
interface typeProps {
  type: "default" | "big" | "voice";
  userName: string;
  imgUrl: string;
}

interface defaultProps extends typeProps {
  type: "default";
  status: TypeStatusProps;
  speak?: boolean | undefined;
  notification?: number | string | undefined;
}
interface voiceProps extends typeProps {
  type: "voice";
  speak: boolean;
  status?: TypeStatusProps | undefined;
  notification?: number | string | undefined;
}
interface bigProps extends typeProps {
  type: "big";
  notification: number | string;
  speak?: boolean | undefined;
  status?: TypeStatusProps | undefined;
}

export type TypePropsUserAvatar = defaultProps | voiceProps | bigProps;
