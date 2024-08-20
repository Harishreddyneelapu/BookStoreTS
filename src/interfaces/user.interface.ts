import { Document } from 'mongoose';


export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
