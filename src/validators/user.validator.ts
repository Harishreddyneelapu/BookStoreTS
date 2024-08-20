import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import HttpStatus from 'http-status-codes';

export const newValidatorRegister = (req: Request, res: Response, next: NextFunction): void => {
  const passwordPattern =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
      .pattern(passwordPattern)
      .messages({
        'string.pattern.base': 'Password must be at least 8 characters long and contain at least one special character, one uppercase letter, one lowercase letter, and one numeric character.'
      })
      .required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    role: Joi.string()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};

export const login = (req: Request, res: Response, next: NextFunction): void => {
  const passwordPattern =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(passwordPattern)
      .messages({
        'string.pattern.base': 'Password must be at least 8 characters long and contain at least one special character, one uppercase letter, one lowercase letter, and one numeric character.'
      })
      .required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};
