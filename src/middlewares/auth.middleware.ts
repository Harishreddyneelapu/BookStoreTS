import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include user properties
export interface CustomRequest extends Request {
  userId?: string;
  userRole?: string;
}

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 */
export const userAuth = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Authorization token is required'
      });
      return;
    }
    
    bearerToken = bearerToken.split(' ')[1];

    const user = jwt.verify(bearerToken, process.env.SECRET_KEY as string) as { _id: string; role: string };
    req.userId = user._id;
    req.userRole = user.role;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};


export const checkRole = async (req:CustomRequest, res:Response, next:NextFunction) => {
  if (req.userRole === 'admin') {
    next();
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'UNAUTHORIZED'
    });
  }
};