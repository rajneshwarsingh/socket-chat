/*
 * @file: joi.validator.ts
 * @description: It contain services function layer for joi validator.
 * @author: Rajneshwar Singh
 */

import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string(),
  userId: Joi.string().required(),
  password: Joi.string().required(),
  profileUrl: Joi.string()
});

const createRoom = Joi.object({
  title: Joi.string().required(),
  roomType: Joi.number().valid(1, 2).required(),
  description: Joi.string(),
  icon: Joi.string(),
  admins: Joi.array().required(),
  members: Joi.array().required()
});

const updateRoom = Joi.object({
  title: Joi.string(),
  roomType: Joi.number().valid(1, 2),
  description: Joi.string(),
  icon: Joi.string(),
  admins: Joi.array(),
  members: Joi.array()
});

const messageSchema = Joi.object({
  roomId: Joi.string().required(),
  pageNum: Joi.string().required()
});

const validationMiddleware = async (req: any, res: any, next: any, schema: string) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false // ignore unknown props
  };
  if (schema === 'register') {
    var { error } = registerSchema.validate(req.body, options);
  }

  if (schema === 'createRoom') {
    var { error } = createRoom.validate(req.body, options);
  }

  if (schema === 'updateRoom') {
    var { error } = updateRoom.validate(req.body, options);
  }

  if (schema === 'message') {
    var { error } = messageSchema.validate(req.query, options);
  }

  if (error) {
    const validateErrors = { validationError: error.details[0].message };
    res.status(400).json(validateErrors);
  } else {
    next();
  }
};

export default validationMiddleware;
