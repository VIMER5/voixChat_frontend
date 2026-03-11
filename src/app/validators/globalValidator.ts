import Joi from "joi";

export const UserID = Joi.number().integer().required().messages({
  "number.base": "User ID must be a number",
  "number.integer": "User ID must be an integer",
  "any.required": "User ID is required",
});

export const onlineStatus = Joi.string().valid("online", "offline").required().messages({
  "string.base": "Статус должен быть строкой",
  "any.only": "Статус может быть только 'online' или 'offline'",
});
