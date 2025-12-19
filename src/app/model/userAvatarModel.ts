import { type TypeStatusProps } from "@model/userStatusModel";
interface typeProps {
  type: "default" | "big" | "voice";
  userName: string;
  imgUrl: string;
}

interface defaultProps extends typeProps {
  type: "default";
  status: TypeStatusProps;
}
interface voiceProps extends typeProps {
  type: "voice";
  speak: boolean;
}
interface bigProps extends typeProps {
  type: "big";
  notification: number | string;
}

export type TypePropsUserAvatar = defaultProps | voiceProps | bigProps;
