import Joi from "joi";
import { UserID, onlineStatus } from "@/app/validators/globalValidator";

export const onlineDataSchema = Joi.object({
  userID: UserID,
  status: onlineStatus,
});
