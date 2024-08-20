import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

// Define interfaces for the data returned by UserService
interface IUserRegisterResponse {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface IUserLoginResponse {
  _id: string;
  firstName: string;
  email: string;
  role: string;
}

interface IUserLoginRequest {
  email: string;
  password: string;
}

export const newRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await UserService.newUserRegister(req.body);
    
    
    const { firstName, lastName, email, role } = data as IUserRegisterResponse;

    if (!firstName || !email || !role) {
      throw new Error('Incomplete user data received');
    }

    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      success: true,
      message: 'User created successfully',
      data: {
        firstName,
        lastName,
        email,
        role
      }
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const login = async (req: Request<{}, {}, IUserLoginRequest>, res: Response): Promise<void> => {
  try {
    const data = await UserService.login(req.body);

    
    const { _id, firstName, email, role } = data as IUserLoginResponse;

    if (!_id || !firstName || !email || !role) {
      throw new Error('Incomplete user data received');
    }

    const token = jwt.sign(
      { _id, email, role },
      process.env.SECRET_KEY as string,
      { expiresIn: '2h' }
    );

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: 'User found in our database',
      data: {
        _id,
        firstName,
        email,
        token
      }
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};
