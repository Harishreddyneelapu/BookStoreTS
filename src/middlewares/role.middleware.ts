import { Request, Response, NextFunction } from 'express';


interface CustomRequest extends Request {
  body: {
    role?: string;
    [key: string]: any;
  };
}

/**
 * Middleware to set the role to 'user'
 *
 * @param {CustomRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function roleUser(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void {
  req.body.role = 'user';
  next();
}

/**
 * Middleware to set the role to 'admin'
 *
 * @param {CustomRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function roleAdmin(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void {
  req.body.role = 'admin';
  next();
}
