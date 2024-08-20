import { Document } from 'mongoose';

export interface IBook extends Document {
    description: string;
    discountPrice: number;
    bookImage?: string | null;
    admin_user_id?: string;
    bookName: string;
    author: string;
    quantity: number;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
