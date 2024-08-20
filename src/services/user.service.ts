import User from '../models/user.model';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user.interface'; // Import the User interface

interface IRegisterRequest {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

export const newUserRegister = async (body: IRegisterRequest): Promise<IUser> => {
  // Check if the email already exists
  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash the password
  const hashedPassword = await new Promise<string>((resolve, reject) => {
    bcrypt.hash(body.password, 10, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        resolve(hashedPassword);
      }
    });
  });

  body.password = hashedPassword;
  delete body.confirmPassword;

  // Create and return the new user
  const newUser = await User.create(body);
  return newUser;
};

export const login = async (body: ILoginRequest): Promise<IUser> => {
  // Find the user by email
  const userObj = await User.findOne({ email: body.email });
  if (!userObj) {
    throw new Error('Invalid Email');
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(body.password, userObj.password, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

  if (isPasswordValid) {
    return userObj;
  } else {
    throw new Error('Invalid Password');
  }
};
