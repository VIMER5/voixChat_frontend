import Joi from "joi";
export const loginSchema = Joi.string()
  .min(4)
  .max(12)
  .pattern(/^[a-zA-Z0-9_]+$/)
  .required()
  .messages({
    "string.empty": "Логин обязателен",
    "string.min": "Логин должен быть не менее 4 символов",
    "string.max": "Логин должен быть не более 12 символов",
    "string.pattern.base": "Логин может содержать только буквы, цифры и подчеркивания",
    "any.required": "Логин обязателен",
  });

export const usernameSchema = Joi.string()
  .min(4)
  .max(20)
  .pattern(/^[a-zA-Z0-9_]+$/)
  .required()
  .messages({
    "string.empty": "Имя пользователя обязательно",
    "string.min": "Имя должно быть не менее 4 символов",
    "string.max": "Имя должно быть не более 20 символов",
    "string.pattern.base": "Имя может содержать только буквы, цифры и подчеркивания",
    "any.required": "Имя пользователя обязательно",
  });

export const emailSchema = Joi.string().email().required().messages({
  "string.empty": "Email обязателен",
  "string.email": "Неверный email",
  "any.required": "Email обязателен",
});

export const passwordSchema = Joi.string()
  .min(8)
  .max(40)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .required()
  .messages({
    "string.empty": "Пароль обязателен",
    "string.min": "Пароль должен быть не менее 8 символов",
    "string.max": "Пароль должен быть не более 40 символов",
    "string.pattern.base": "Пароль должен содержать заглавные, строчные буквы и цифры",
    "any.required": "Пароль обязателен",
  });
