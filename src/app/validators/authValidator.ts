import Joi from "joi";
import { loginSchema, emailSchema, passwordSchema } from "@/app/validators/inputsValidator";

export const registerSchema = Joi.object({
  login: loginSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Пароли не совпадают",
    "any.required": "Подтверждение пароля обязательно",
  }),
});
